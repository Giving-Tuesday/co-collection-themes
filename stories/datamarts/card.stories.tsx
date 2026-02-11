import { DatamartsCard } from '../../src';
import { Item } from '../../src/types';
import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/datamarts-item.json';

export default {
  title: 'Themes/Datamarts',
  component: DatamartsCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => (
  <>
    <DatamartsCard item={item as Item} href="" />
    <DatamartsCard
      item={
        {
          ...item,
          custom_fields: { ...item.custom_fields, recently_added: false },
        } as Item
      }
      href=""
    />
  </>
);
