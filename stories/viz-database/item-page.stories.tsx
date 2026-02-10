import { VizDatabaseItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
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
