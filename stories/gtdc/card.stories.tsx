import { GtdcCard } from '../../src';

import item from '../_mocks/gtdc-item.json';
import CardContainer from '../_decorators/CardContainer';

export default {
  title: 'Themes/Gtdc',
  component: GtdcCard,
  decorators: [(Story) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <GtdcCard item={item} />;
