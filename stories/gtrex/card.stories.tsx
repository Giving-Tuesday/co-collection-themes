import { GtrexCard } from '../../src';
import { Item } from '../../src/types';
import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/gtrex-item.json';

export default {
  title: 'Themes/Gtrex',
  component: GtrexCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <GtrexCard item={item as Item} href="" />;
