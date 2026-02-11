import { AfricanGivingTraditionsItemPage } from '../../src';
import { Item } from '../../src/types';
import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/african-giving-traditions-item.json';

export default {
  title: 'Themes/African Giving Traditions',
  component: AfricanGivingTraditionsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <AfricanGivingTraditionsItemPage item={item as Item} />
  </ItemPageContainer>
);
