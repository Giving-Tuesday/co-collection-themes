import { GtrexCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/gtrex-item.json';

export default {
  title: 'Themes/Gtrex',
  component: GtrexCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <GtrexCard item={item} />;
