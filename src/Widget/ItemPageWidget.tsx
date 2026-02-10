import styles from './Widget.module.css';
import type { Item } from '../types';
import clsx from 'clsx';

interface ItemPageWidgetProps {
  items: Item[];
  CardComponent: React.ComponentType<any>;
  embedUrl: string;
  maxCardsPerRow?: number;
  showYear?: boolean;
  isItemPageWidget?: boolean;
}

const ItemPageWidget = ({
  items,
  CardComponent,
  embedUrl,
  maxCardsPerRow = 5,
  showYear,
}: ItemPageWidgetProps) => {
  const itemCount = items?.length || 0;

  if (!CardComponent) {
    console.warn('[ItemPageWidget] No CardComponent provided');
    return null;
  }

  return (
    <div
      className={clsx(
        'daro-widget',
        styles.base,
        // @ts-expect-error styles any
        styles[`count${Math.min(itemCount, maxCardsPerRow)}`],
        styles.widgetWrapper,
      )}
    >
      {items?.map((item: any) => (
        <CardComponent
          showYear={showYear}
          key={item._id}
          href={`${embedUrl}?co-item=${item.slug}&from=widget`}
          item={item}
        />
      ))}
    </div>
  );
};

export default ItemPageWidget;
