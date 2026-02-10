import { AfricanGivingTraditionsCard } from '../../src';

import item from '../_mocks/african-giving-traditions-item.json';
import CardContainer from '../_decorators/CardContainer';

export default {
  title: 'Themes/African Giving Traditions',
  component: AfricanGivingTraditionsCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <AfricanGivingTraditionsCard item={item} />;
