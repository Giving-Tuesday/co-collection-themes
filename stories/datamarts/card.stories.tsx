import { DatamartsCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/datamarts-item.json'... Remove this comment to see the full error message
import item from '../_mocks/datamarts-item.json';

export default {
  title: 'Themes/Datamarts',
  component: DatamartsCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => (
  <>
    <DatamartsCard item={item} />
    <DatamartsCard
      item={{ ...item, custom_fields: { ...item.custom_fields, recently_added: false } }}
    />
  </>
);
