import { DatasetsCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/datasets-item.json';

export default {
  title: 'Themes/Datasets',
  component: DatasetsCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <DatasetsCard item={item} />;
