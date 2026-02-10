import { DatasetsCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/datasets-item.json'.... Remove this comment to see the full error message
import item from '../_mocks/datasets-item.json';

export default {
  title: 'Themes/Datasets',
  component: DatasetsCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <DatasetsCard item={item} />;
