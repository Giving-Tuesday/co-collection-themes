import { DatasetsItemPage } from '../../src';
import type { Item } from '../../src/types';
import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/datasets-item.json';

export default {
  title: 'Themes/Datasets',
  component: DatasetsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <DatasetsItemPage item={item as Item} />
  </ItemPageContainer>
);
