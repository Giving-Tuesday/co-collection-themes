import { ProblemsSolutionsCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/problems-solutions-item.json';

export default {
  title: 'Themes/Problems & Solutions',
  component: ProblemsSolutionsCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <ProblemsSolutionsCard item={item} />;
