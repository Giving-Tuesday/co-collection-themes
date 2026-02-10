import { GtdcItemPage } from '../../src';

import ItemPageContainer from '../_decorators/ItemPageContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/gtdc-item.json'. Con... Remove this comment to see the full error message
import item from '../_mocks/gtdc-item.json';

export default {
  title: 'Themes/Gtdc',
  component: GtdcItemPage,
};

export const ItemPage = () => (
  <ItemPageContainer>
    <GtdcItemPage item={item} />
  </ItemPageContainer>
);
