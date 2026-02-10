import { DatamartsItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/datamarts-item.json';

export default {
  title: 'Themes/Datamarts',
  component: DatamartsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <DatamartsItemPage itemData={item} />
  </ItemPageContainer>
);
