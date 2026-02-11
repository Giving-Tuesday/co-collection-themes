import { PosterchildCard } from '../../src';
import type { Item } from '../../src/types';
import item from '../_mocks/posterchild-item.json';
import CardContainer from '../_decorators/CardContainer';

export default {
  title: 'Themes/Posterchild',
  component: PosterchildCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <PosterchildCard item={item as Item} href="" />;
