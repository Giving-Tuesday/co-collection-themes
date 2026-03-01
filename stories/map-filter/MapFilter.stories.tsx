import { useState } from 'react';
import { MapFilter } from '../../src/MapFilter/MapFilter';
import type { MarkerData } from '../../src/MapFilter/MapFilter';

export default {
  title: 'Components/MapFilter',
  component: MapFilter,
};

const AVAILABLE = [
  'United States',
  'Canada',
  'Africa',
  'Kenya',
  'India',
  'Brazil',
  'Australia',
  'Germany',
  'Japan',
];

export const Default = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option],
    );
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h2 style={{ marginBottom: '8px', fontFamily: 'sans-serif' }}>
        Filter by Region
      </h2>
      <p style={{ marginBottom: '16px', fontFamily: 'sans-serif', fontSize: '14px', color: '#666' }}>
        Click a highlighted country or region to select it. Click again to deselect.
        <br />
        <strong>Blue</strong> = available &nbsp;|&nbsp; <strong>Dark blue</strong> = selected &nbsp;|&nbsp; <strong>Grey</strong> = unavailable
      </p>

      <MapFilter
        availableOptions={AVAILABLE}
        selectedOptions={selected}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: '16px', fontFamily: 'sans-serif', fontSize: '14px' }}>
        <strong>Selected:</strong>{' '}
        {selected.length > 0 ? selected.join(', ') : <em>none</em>}
      </div>
    </div>
  );
};

export const WithPreselected = () => {
  const [selected, setSelected] = useState<string[]>(['Kenya', 'Brazil', 'Germany']);

  const handleSelect = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option],
    );
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h2 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>
        Pre-selected Regions
      </h2>

      <MapFilter
        availableOptions={AVAILABLE}
        selectedOptions={selected}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: '16px', fontFamily: 'sans-serif', fontSize: '14px' }}>
        <strong>Selected:</strong>{' '}
        {selected.length > 0 ? selected.join(', ') : <em>none</em>}
      </div>
    </div>
  );
};

// --- Marker story helpers ---

function generateMarkers(
  center: [number, number],
  count: number,
  spread: number,
): MarkerData[] {
  // Seeded pseudo-random for reproducible stories
  let seed = center[0] * 1000 + center[1] * 100 + count;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    longitude: center[0] + (rand() - 0.5) * spread * 2,
    latitude: center[1] + (rand() - 0.5) * spread * 2,
    label: `Point ${i + 1}`,
  }));
}

export const WithMarkers = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option],
    );
  };

  const markers: MarkerData[] = [
    ...generateMarkers([-95, 38], 5, 10),     // US
    ...generateMarkers([-100, 56], 3, 8),     // Canada
    ...generateMarkers([36, -1], 5, 3),       // Kenya
    ...generateMarkers([78, 22], 4, 6),       // India
    ...generateMarkers([-50, -15], 4, 8),     // Brazil
    ...generateMarkers([134, -25], 4, 6),     // Australia
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h2 style={{ marginBottom: '8px', fontFamily: 'sans-serif' }}>
        With Markers (~25 points)
      </h2>
      <p style={{ marginBottom: '16px', fontFamily: 'sans-serif', fontSize: '14px', color: '#666' }}>
        Markers cluster when zoomed out. Click a cluster to expand. Hover an individual marker to see its label.
      </p>

      <MapFilter
        availableOptions={AVAILABLE}
        selectedOptions={selected}
        onSelect={handleSelect}
        markers={markers}
        onMarkerClick={(m) => console.log('Marker clicked:', m)}
      />

      <div style={{ marginTop: '16px', fontFamily: 'sans-serif', fontSize: '14px' }}>
        <strong>Selected:</strong>{' '}
        {selected.length > 0 ? selected.join(', ') : <em>none</em>}
      </div>
    </div>
  );
};

export const DenseMarkerCluster = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option],
    );
  };

  const markers = generateMarkers([37, -0.5], 200, 2);

  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h2 style={{ marginBottom: '8px', fontFamily: 'sans-serif' }}>
        Dense Marker Cluster (200 points in Kenya)
      </h2>
      <p style={{ marginBottom: '16px', fontFamily: 'sans-serif', fontSize: '14px', color: '#666' }}>
        200 markers concentrated in Kenya. Click clusters to zoom and reveal sub-clusters then individual points.
      </p>

      <MapFilter
        availableOptions={AVAILABLE}
        selectedOptions={selected}
        onSelect={handleSelect}
        markers={markers}
        onMarkerClick={(m) => console.log('Marker clicked:', m)}
      />

      <div style={{ marginTop: '16px', fontFamily: 'sans-serif', fontSize: '14px' }}>
        <strong>Selected:</strong>{' '}
        {selected.length > 0 ? selected.join(', ') : <em>none</em>}
      </div>
    </div>
  );
};

export const GlobalMarkerSpread = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option],
    );
  };

  const markers: MarkerData[] = [
    ...generateMarkers([-95, 38], 60, 15),    // North America
    ...generateMarkers([-60, -15], 60, 20),   // South America
    ...generateMarkers([15, 5], 80, 20),      // Africa
    ...generateMarkers([10, 50], 60, 12),     // Europe
    ...generateMarkers([80, 25], 80, 15),     // South Asia
    ...generateMarkers([110, 5], 60, 15),     // Southeast Asia
    ...generateMarkers([140, 37], 40, 5),     // Japan
    ...generateMarkers([134, -25], 40, 10),   // Australia
    ...generateMarkers([40, 55], 20, 10),     // Russia
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h2 style={{ marginBottom: '8px', fontFamily: 'sans-serif' }}>
        Global Marker Spread (~500 points)
      </h2>
      <p style={{ marginBottom: '16px', fontFamily: 'sans-serif', fontSize: '14px', color: '#666' }}>
        ~500 markers across multiple continents. Tests clustering at global zoom level.
      </p>

      <MapFilter
        availableOptions={AVAILABLE}
        selectedOptions={selected}
        onSelect={handleSelect}
        markers={markers}
        onMarkerClick={(m) => console.log('Marker clicked:', m)}
      />

      <div style={{ marginTop: '16px', fontFamily: 'sans-serif', fontSize: '14px' }}>
        <strong>Selected:</strong>{' '}
        {selected.length > 0 ? selected.join(', ') : <em>none</em>}
      </div>
    </div>
  );
};

export const BroadRegions = () => {
  const REGIONAL_OPTIONS = [
    'Africa',
    'Latin America',
    'South Asia',
    'Southeast Asia',
    'Eastern Europe',
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option],
    );
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h2 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>
        Broad Regions Only
      </h2>

      <MapFilter
        availableOptions={REGIONAL_OPTIONS}
        selectedOptions={selected}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: '16px', fontFamily: 'sans-serif', fontSize: '14px' }}>
        <strong>Selected:</strong>{' '}
        {selected.length > 0 ? selected.join(', ') : <em>none</em>}
      </div>
    </div>
  );
};
