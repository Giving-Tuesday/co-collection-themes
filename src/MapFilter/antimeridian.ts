import type { Feature, FeatureCollection, Geometry, Position } from 'geojson';

/**
 * Splits GeoJSON polygons that cross the antimeridian (±180° longitude)
 * into separate east/west halves so Leaflet renders them correctly.
 */

type Ring = Position[];

function crossesAntimeridian(a: Position, b: Position): boolean {
  return Math.abs(a[0]! - b[0]!) > 180;
}

/** Linearly interpolate latitude at the antimeridian between two points that cross it. */
function interpolateLat(a: Position, b: Position): number {
  const lngA = a[0]!;
  const latA = a[1]!;
  const lngB = b[0]!;
  const latB = b[1]!;
  // Shift b's longitude to the same side as a so interpolation works
  const adjLngB = lngB + (lngA > 0 ? 360 : -360);
  const boundary = lngA > 0 ? 180 : -180;
  const t = (boundary - lngA) / (adjLngB - lngA);
  return latA + t * (latB - latA);
}

/** Check if any edge in a ring crosses the antimeridian. */
function ringCrosses(ring: Ring): boolean {
  for (let i = 0; i < ring.length - 1; i++) {
    if (crossesAntimeridian(ring[i]!, ring[i + 1]!)) return true;
  }
  return false;
}

/**
 * Split a single ring into east (lng > 0) and west (lng < 0) segments.
 * Each segment is closed into a valid ring.
 */
function splitRing(ring: Ring): { east: Ring[]; west: Ring[] } {
  interface Segment {
    side: 'east' | 'west';
    coords: Position[];
  }

  const segments: Segment[] = [];
  let current: Position[] = [];
  let side: 'east' | 'west' = ring[0]![0]! >= 0 ? 'east' : 'west';

  for (let i = 0; i < ring.length; i++) {
    const pt = ring[i]!;

    if (i > 0 && crossesAntimeridian(ring[i - 1]!, pt)) {
      const lat = interpolateLat(ring[i - 1]!, pt);
      // Close current segment at the boundary
      current.push([side === 'east' ? 180 : -180, lat]);
      segments.push({ side, coords: current });
      // Start new segment on the other side
      side = side === 'east' ? 'west' : 'east';
      current = [[side === 'east' ? 180 : -180, lat]];
    }

    current.push(pt);
  }

  if (current.length > 0) {
    segments.push({ side, coords: current });
  }

  // Close each segment into a ring (first point = last point, min 4 points for a valid ring)
  const closeRing = (coords: Position[]): Ring => {
    const first = coords[0]!;
    const last = coords[coords.length - 1]!;
    if (first[0] !== last[0] || first[1] !== last[1]) {
      coords.push([first[0]!, first[1]!]);
    }
    return coords;
  };

  return {
    east: segments
      .filter((s) => s.side === 'east')
      .map((s) => closeRing(s.coords))
      .filter((r) => r.length >= 4),
    west: segments
      .filter((s) => s.side === 'west')
      .map((s) => closeRing(s.coords))
      .filter((r) => r.length >= 4),
  };
}

/** Split a single polygon (array of rings) that crosses the antimeridian. */
function splitPolygonCoords(rings: Ring[]): Ring[][] {
  const outerRing = rings[0]!;
  if (!ringCrosses(outerRing)) return [rings];

  const { east, west } = splitRing(outerRing);
  const result: Ring[][] = [];

  // Each split segment becomes its own polygon (ignoring holes for simplicity)
  for (const ring of east) result.push([ring]);
  for (const ring of west) result.push([ring]);

  return result;
}

/** Process a single feature, splitting it if it crosses the antimeridian. */
function splitFeature(feature: Feature<Geometry>): Feature<Geometry>[] {
  const geom = feature.geometry;

  if (geom.type === 'Polygon') {
    const parts = splitPolygonCoords(geom.coordinates as Ring[]);
    if (parts.length <= 1) return [feature];
    return parts.map((coords) => ({
      ...feature,
      geometry: { type: 'Polygon' as const, coordinates: coords },
    }));
  }

  if (geom.type === 'MultiPolygon') {
    const allParts: Ring[][] = [];
    for (const polygon of geom.coordinates as Ring[][]) {
      allParts.push(...splitPolygonCoords(polygon));
    }
    // If nothing changed, return as-is
    if (allParts.length === (geom.coordinates as Ring[][]).length) return [feature];
    return [
      {
        ...feature,
        geometry: { type: 'MultiPolygon' as const, coordinates: allParts },
      },
    ];
  }

  return [feature];
}

/** Split all features in a FeatureCollection at the antimeridian. */
export function fixAntimeridian(fc: FeatureCollection): FeatureCollection {
  return {
    ...fc,
    features: fc.features.flatMap((f) => splitFeature(f as Feature<Geometry>)),
  };
}
