import { GtdcCard } from '../../src';
import item from '../_mocks/gtdc-item.json';
import CardContainer from '../_decorators/CardContainer';
import { Item } from '../../src/types';

export default {
  title: 'Themes/Gtdc',
  component: GtdcCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <GtdcCard item={item as Item} href="" />;
