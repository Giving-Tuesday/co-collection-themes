import { DatasetsCard } from '../../src';
import { Item } from '../../src/types';
import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/datasets-item.json';

export default {
  title: 'Themes/Datasets',
  component: DatasetsCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <DatasetsCard item={item as Item} href="" />;
