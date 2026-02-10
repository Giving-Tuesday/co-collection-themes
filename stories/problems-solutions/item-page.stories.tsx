import { ProblemsSolutionsItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/problems-solutions-i... Remove this comment to see the full error message
import item from '../_mocks/problems-solutions-item.json';

export default {
  title: 'Themes/Problems & Solutions',
  component: ProblemsSolutionsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <ProblemsSolutionsItemPage item={item} />
  </ItemPageContainer>
);
