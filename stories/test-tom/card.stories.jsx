import { TestTomCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/test-tom-item.json';

export default {
  title: 'Themes/Test-Tom',
  component: TestTomCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <TestTomCard item={item} />;
