import { PosterchildItemPage } from '../../src';
import type { Item } from '../../src/types';
import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/posterchild-item.json';

export default {
  title: 'Themes/Posterchild',
  component: PosterchildItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <PosterchildItemPage item={item as Item} />
  </ItemPageContainer>
);
