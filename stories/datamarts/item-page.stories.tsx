import { DatamartsItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/datamarts-item.json'... Remove this comment to see the full error message
import item from '../_mocks/datamarts-item.json';

export default {
  title: 'Themes/Datamarts',
  component: DatamartsItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <DatamartsItemPage item={item} />
  </ItemPageContainer>
);
