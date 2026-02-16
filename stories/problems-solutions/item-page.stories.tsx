import { ProblemsSolutionsItemPage } from '../../src';
import type { Item } from '../../src/types';
import ItemPageContainer from '../_decorators/ItemPageContainer';
import item from '../_mocks/problems-solutions-item.json';

export default {
  title: 'Themes/Problems & Solutions',
  component: ProblemsSolutionsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <ProblemsSolutionsItemPage item={item as Item} />
  </ItemPageContainer>
);
