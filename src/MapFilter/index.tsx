import { useEffect, useMemo, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import type { Layer, LeafletMouseEvent } from 'leaflet';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import * as topojson from 'topojson-client';
import type { Topology } from 'topojson-specification';
import clsx from 'clsx';
import ProtomapsLayer from './ProtomapsLayer';
import { resolveIsoCodes, isoToOptions } from './regionMapping';
import { fixAntimeridian } from './antimeridian';
import styles from './MapFilter.module.css';
import type { MapFilterProps } from './types';
import 'leaflet/dist/leaflet.css';

const TOPO_JSON_URL = 'https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@1/world/110m.json';

const PROTOMAPS_TILE_URL =
  'https://api.protomaps.com/tiles/v4/{z}/{x}/{y}.mvt?key=83f3bba9f012d1fc';

const STYLE_UNAVAILABLE = {
  fillColor: '#d1d5db',
  fillOpacity: 0.3,
  color: '#9ca3af',
  weight: 0.5,
};

const STYLE_AVAILABLE = {
  fillColor: '#93c5fd',
  fillOpacity: 0.5,
  color: '#3b82f6',
  weight: 1,
};

const STYLE_SELECTED = {
  fillColor: '#2563eb',
  fillOpacity: 0.7,
  color: '#1d4ed8',
  weight: 1.5,
};

/** Extract ISO alpha-3 code from a visionscarto-world-atlas feature. */
function getIso3(feature: Feature<Geometry> | undefined): string | undefined {
  return feature?.properties?.['a3'] as string | undefined;
}

const MapFilter = ({
  availableOptions,
  selectedOptions = [],
  onSelect,
  className,
}: MapFilterProps) => {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  // Fetch TopoJSON on mount, convert to GeoJSON
  useEffect(() => {
    fetch(TOPO_JSON_URL)
      .then((res) => res.json())
      .then((topo: Topology) => {
        if (!topo.objects['countries']) return;
        const fc = topojson.feature(topo, topo.objects['countries']!) as FeatureCollection;
        setGeoData(fixAntimeridian(fc));
      })
      .catch((err) => {
        console.error('Failed to load TopoJSON:', err);
      });
  }, []);

  // Resolve available and selected options to ISO alpha-3 code sets
  const availableCodes = useMemo(() => resolveIsoCodes(availableOptions), [availableOptions]);
  const selectedCodes = useMemo(() => resolveIsoCodes(selectedOptions), [selectedOptions]);

  // Style each feature based on availability/selection state
  const styleFeature = (feature: Feature<Geometry> | undefined) => {
    const iso3 = getIso3(feature);
    if (!iso3) return STYLE_UNAVAILABLE;
    if (selectedCodes.has(iso3)) return STYLE_SELECTED;
    if (availableCodes.has(iso3)) return STYLE_AVAILABLE;
    return STYLE_UNAVAILABLE;
  };

  // Attach click handlers only to available countries
  const onEachFeature = (feature: Feature<Geometry>, layer: Layer) => {
    const iso3 = getIso3(feature);
    if (!iso3 || !availableCodes.has(iso3)) return;

    const matchingOptions = isoToOptions(iso3, availableOptions);
    if (matchingOptions.length === 0) return;

    layer.on({
      click: () => {
        onSelect(matchingOptions[0]!);
      },
      mouseover: (e: LeafletMouseEvent) => {
        const target = e.target as Layer & {
          setStyle?: (s: Record<string, unknown>) => void;
        };
        target.setStyle?.({
          fillOpacity: selectedCodes.has(iso3) ? 0.85 : 0.65,
        });
      },
      mouseout: (e: LeafletMouseEvent) => {
        const target = e.target as Layer & {
          setStyle?: (s: Record<string, unknown>) => void;
        };
        target.setStyle?.(selectedCodes.has(iso3) ? STYLE_SELECTED : STYLE_AVAILABLE);
      },
    });
  };

  // Key derived from options to force GeoJSON re-render on prop changes
  const geoJsonKey = `${availableOptions.join(',')}_${selectedOptions.join(',')}`;

  if (!geoData)
    return <div className={clsx(styles.container, className)}>Loading map…</div>;

  return (
    <div className={clsx(styles.container, className)}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        scrollWheelZoom={true}
        className={styles['map'] ?? ''}
      >
        <ProtomapsLayer url={PROTOMAPS_TILE_URL} />
        <GeoJSON
          key={geoJsonKey}
          data={geoData}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
};

export default MapFilter;
export type { MapFilterProps } from './types';
