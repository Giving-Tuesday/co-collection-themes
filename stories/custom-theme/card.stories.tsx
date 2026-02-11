import { CustomThemeCard } from '../../src';
import { Item } from '../../src/types';
import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/custom-theme-item.json';

export default {
  title: 'Themes/Custom Theme',
  component: CustomThemeCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <CustomThemeCard item={item as Item} href="" />;
