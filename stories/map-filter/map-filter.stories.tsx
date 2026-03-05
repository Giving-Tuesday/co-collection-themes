import { MapFilter } from '../../src/MapFilter';

export default {
  title: 'MapFilter',
  component: MapFilter,
  decorators: [(Story: any) => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => {
  return <MapFilter />;
};
// export const Card = () => <PosterchildCard item={item as Item} href="" />;
