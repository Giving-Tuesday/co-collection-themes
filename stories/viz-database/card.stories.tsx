import { VizDatabaseCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/viz-database-item.js... Remove this comment to see the full error message
import item from '../_mocks/viz-database-item.json';

export default {
  title: 'Themes/Viz Database',
  component: VizDatabaseCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <VizDatabaseCard item={item} />;
