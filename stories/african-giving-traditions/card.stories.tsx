import { AfricanGivingTraditionsCard } from '../../src';
import item from '../_mocks/african-giving-traditions-item.json';
import CardContainer from '../_decorators/CardContainer';
import type { Item } from '../../src/types';

export default {
  title: 'Themes/African Giving Traditions',
  component: AfricanGivingTraditionsCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <AfricanGivingTraditionsCard item={item as Item} href="" />;
