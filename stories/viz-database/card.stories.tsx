import { VizDatabaseCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/viz-database-item.json';

export default {
  title: 'Themes/Viz Database',
  component: VizDatabaseCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <VizDatabaseCard item={item} />;
