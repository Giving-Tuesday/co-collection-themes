import { VizDatabaseItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/viz-database-item.js... Remove this comment to see the full error message
import item from '../_mocks/viz-database-item.json';

export default {
  title: 'Themes/Viz Database',
  component: VizDatabaseItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <VizDatabaseItemPage itemData={item} />
  </ItemPageContainer>
);
