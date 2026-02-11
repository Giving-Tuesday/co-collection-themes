import { ProblemsSolutionsCard } from '../../src';
import type { Item } from '../../src/types';
import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/problems-solutions-item.json';

export default {
  title: 'Themes/Problems & Solutions',
  component: ProblemsSolutionsCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <ProblemsSolutionsCard item={item as Item} href="" />;
