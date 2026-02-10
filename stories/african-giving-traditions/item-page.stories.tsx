import { AfricanGivingTraditionsItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/african-giving-tradi... Remove this comment to see the full error message
import item from '../_mocks/african-giving-traditions-item.json';

export default {
  title: 'Themes/African Giving Traditions',
  component: AfricanGivingTraditionsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <AfricanGivingTraditionsItemPage itemData={item} />
  </ItemPageContainer>
);
