import { DatamartsCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/datamarts-item.json';

export default {
  title: 'Themes/Datamarts',
  component: DatamartsCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => (
  <>
    <DatamartsCard item={item} />
    <DatamartsCard
      item={{ ...item, custom_fields: { ...item.custom_fields, recently_added: false } }}
    />
  </>
);
