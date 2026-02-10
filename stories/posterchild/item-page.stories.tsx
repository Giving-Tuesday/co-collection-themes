import { PosterchildItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/posterchild-item.jso... Remove this comment to see the full error message
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
