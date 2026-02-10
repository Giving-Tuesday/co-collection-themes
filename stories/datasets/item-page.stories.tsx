import { DatasetsItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/datasets-item.json'.... Remove this comment to see the full error message
import item from '../_mocks/datasets-item.json';

export default {
  title: 'Themes/Datasets',
  component: DatasetsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <DatasetsItemPage item={item} />
  </ItemPageContainer>
);
