import { DatasetsItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/datasets-item.json';

export default {
  title: 'Themes/Datasets',
  component: DatasetsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <DatasetsItemPage itemData={item} />
  </ItemPageContainer>
);
