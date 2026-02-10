import { GtdcCard } from '../../src';

// @ts-expect-error TS(2732): Cannot find module '../_mocks/gtdc-item.json'. Con... Remove this comment to see the full error message
import item from '../_mocks/gtdc-item.json';
import CardContainer from '../_decorators/CardContainer';

export default {
  title: 'Themes/Gtdc',
  component: GtdcCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <GtdcCard item={item} />;
