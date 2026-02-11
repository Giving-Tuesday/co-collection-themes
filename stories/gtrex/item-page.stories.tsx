import { GtrexItemPage } from '../../src';
import type { Item } from '../../src/types';
import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/gtrex-item-with-widget.json';

export default {
  title: 'Themes/Gtrex',
  component: GtrexItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <GtrexItemPage item={item as Item} />
  </ItemPageContainer>
);
