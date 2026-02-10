import { GtrexItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/gtrex-item-with-widget.json';

export default {
  title: 'Themes/Gtrex',
  component: GtrexItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <GtrexItemPage itemData={item} />
  </ItemPageContainer>
);
