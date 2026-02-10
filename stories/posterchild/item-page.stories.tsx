import { PosterchildItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/posterchild-item.json';

export default {
  title: 'Themes/Posterchild',
  component: PosterchildItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <PosterchildItemPage itemData={item} />
  </ItemPageContainer>
);
