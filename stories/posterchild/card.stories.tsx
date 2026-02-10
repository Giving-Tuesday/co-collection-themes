import { PosterchildCard } from '../../src';

// @ts-expect-error TS(2732): Cannot find module '../_mocks/posterchild-item.jso... Remove this comment to see the full error message
import item from '../_mocks/posterchild-item.json';
import CardContainer from '../_decorators/CardContainer';

export default {
  title: 'Themes/Posterchild',
  component: PosterchildCard,
  decorators: [(Story: any) => <CardContainer>{Story()}</CardContainer>],
};

export const Card = () => <PosterchildCard item={item} />;
