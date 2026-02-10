import { CustomThemeCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
import item from '../_mocks/custom-theme-item.json';

export default {
  title: 'Themes/Custom Theme',
  component: CustomThemeCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <CustomThemeCard item={item} />;
