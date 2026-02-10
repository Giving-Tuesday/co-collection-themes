import { AfricanGivingTraditionsCard } from '../../src';

// @ts-expect-error TS(2732): Cannot find module '../_mocks/african-giving-tradi... Remove this comment to see the full error message
import item from '../_mocks/african-giving-traditions-item.json';
import CardContainer from '../_decorators/CardContainer';

export default {
  title: 'Themes/African Giving Traditions',
  component: AfricanGivingTraditionsCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <AfricanGivingTraditionsCard item={item} />;
