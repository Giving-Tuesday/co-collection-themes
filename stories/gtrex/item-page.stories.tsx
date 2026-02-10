import { GtrexItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/gtrex-item-with-widg... Remove this comment to see the full error message
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
