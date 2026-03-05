import { MapFilter } from '../../src/MapFilter';
import { availableOptions, countsByCountry } from './mockData';

export default {
  title: 'MapFilter',
  component: MapFilter,
  decorators: [(Story: any) => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => {
  return (
    <MapFilter availableOptions={availableOptions} countsByCountry={countsByCountry} />
  );
};
