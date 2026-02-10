import { CustomThemeCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/custom-theme-item.js... Remove this comment to see the full error message
import item from '../_mocks/custom-theme-item.json';

export default {
  title: 'Themes/Custom Theme',
  component: CustomThemeCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <CustomThemeCard item={item} />;
