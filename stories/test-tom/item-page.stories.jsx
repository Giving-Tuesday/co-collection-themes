import { TestTomItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/test-tom-item.json';

export default {
  title: 'Themes/Test-Tom',
  component: TestTomItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <TestTomItemPage itemData={item} />
  </ItemPageContainer>
);
