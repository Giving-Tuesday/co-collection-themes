import { ProblemsSolutionsCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/problems-solutions-i... Remove this comment to see the full error message
import item from '../_mocks/problems-solutions-item.json';

export default {
  title: 'Themes/Problems & Solutions',
  component: ProblemsSolutionsCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <ProblemsSolutionsCard item={item} />;
