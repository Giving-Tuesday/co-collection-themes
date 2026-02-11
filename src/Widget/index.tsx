import styles from './Widget.module.css';
import type { Item } from '../types';
import clsx from 'clsx';
import { getThemeCard } from '../utils/card-themes.utils';
import { Card as DefaultCard } from '../themes/gtrex';

interface ItemPageWidgetProps extends CommonWidgetProps {
  type: 'item-page';
  CardComponent?: React.ComponentType<any>;
  showYear?: boolean;
}

interface CommonWidgetProps {
  items: Item[];
  embedUrl: string;
}

interface EmbedWidgetProps extends CommonWidgetProps {
  type: 'embed';
  theme: string;
}

type WidgetProps = ItemPageWidgetProps | EmbedWidgetProps;

const Widget = (props: WidgetProps) => {
  const { items, embedUrl, type } = props;
  let Card: React.ComponentType<any>;
  let showYear = true;

  if (type === 'embed') {
    const EmbedCard = getThemeCard(props.theme);
    if (EmbedCard) Card = EmbedCard;
  } else {
    Card = props.CardComponent || DefaultCard;
    showYear = !!props.showYear;
  }

  return (
    <div className={clsx('daro-widget', styles.base, styles.widgetWrapper)}>
      {items.map((item) => (
        <Card
          href={`${embedUrl}?co-item=${item.slug}&from=widget`}
          item={item}
          key={item._id}
          showYear={showYear}
        />
      ))}
    </div>
  );
};

export default Widget;
