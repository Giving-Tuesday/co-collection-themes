import { GtdcItemPage } from '../../src';
import { Item } from '../../src/types';
import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/gtdc-item.json';

export default {
  title: 'Themes/Gtdc',
  component: GtdcItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <GtdcItemPage item={item as Item} />
  </ItemPageContainer>
);
