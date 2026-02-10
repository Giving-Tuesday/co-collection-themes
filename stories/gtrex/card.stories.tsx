import { GtrexCard } from '../../src';

import CardContainer from '../_decorators/CardContainer';
// @ts-expect-error TS(2732): Cannot find module '../_mocks/gtrex-item.json'. Co... Remove this comment to see the full error message
import item from '../_mocks/gtrex-item.json';

export default {
  title: 'Themes/Gtrex',
  component: GtrexCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <GtrexCard item={item} />;
