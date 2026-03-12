import { MapFilter } from '../../src/MapFilter';
import { locations } from './mockData';

export default {
  title: 'MapFilter',
  component: MapFilter,
  decorators: [(Story: any) => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => {
  return <MapFilter locations={locations} />;
};
