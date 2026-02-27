import { useState } from 'react';
import { MapFilter } from '../../src/MapFilter/MapFilter';

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
