import { Map as MapLibreMap } from 'maplibre-gl';
import { type Location, type GeoConfigEntry } from '../types';

const MARKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 115" width="100" height="115">
  <path d="M50 4 C28 4 10 22 10 44 C10 68 50 111 50 111 C50 111 90 68 90 44 C90 22 72 4 50 4 Z" fill="#E8456A"/>
</svg>`;

export const loadMarkerImage = (map: MapLibreMap): Promise<void> => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([MARKER_SVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image(100, 115);

    img.onload = () => {
      map.addImage('pin-marker', img, { pixelRatio: 2 });
      URL.revokeObjectURL(url);
      resolve();
    };

    img.onerror = reject;
    img.src = url;
  });
};

export const placeToGeoJSON = (options: Location[]): GeoJSON.FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: options.map((option) => {
      const properties = {
        id: option._id,
        title: option.title,
        desc: option.desc,
        slug: option.slug,
      };
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: option.location.coordinates },
        properties,
      };
    }),
  };
};

export const countryCountsGeoJSON = (
  options: Location[],
  countryConfig: GeoConfigEntry[],
): GeoJSON.FeatureCollection | undefined => {
  const configByIso = new Map(countryConfig.map((c) => [c.iso, c]));

  const counts: Record<string, number> = {};
  const coordSums: Record<string, { lng: number; lat: number; n: number }> = {};

  for (const loc of options) {
    const config = configByIso.get(loc.location.iso);
    if (!config) continue;

    const [lng, lat] = loc.location.coordinates;
    let key: string;

    if (config.groupByRegion && loc.location.region) {
      const group = config.groups.find((g) => g.regions.includes(loc.location.region));
      key = group ? `${config.iso} ${group.name}` : config.iso;
    } else {
      key = config.iso;
    }

    counts[key] = (counts[key] || 0) + 1;
    const sum = coordSums[key] || (coordSums[key] = { lng: 0, lat: 0, n: 0 });
    sum.lng += lng;
    sum.lat += lat;
    sum.n += 1;
  }

  const features: GeoJSON.Feature[] = Object.entries(counts).map(([key, count]) => {
    const { lng, lat, n } = coordSums[key]!;
    return {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lng / n, lat / n] },
      properties: { name: key, count },
    };
  });

  if (features.length === 0) return;
  return { type: 'FeatureCollection', features };
};

export const getBounds = (options: Location[]) => {
  if (!options.length) return null;

  return options.reduce(
    (bounds, record) => {
      const [lng, lat] = record.location.coordinates;
      return {
        minLng: Math.min(bounds.minLng, lng),
        maxLng: Math.max(bounds.maxLng, lng),
        minLat: Math.min(bounds.minLat, lat),
        maxLat: Math.max(bounds.maxLat, lat),
      };
    },
    {
      minLng: Infinity,
      maxLng: -Infinity,
      minLat: Infinity,
      maxLat: -Infinity,
    },
  );
};
