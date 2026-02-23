import styles from './Widget.module.css';
import type { CardProps, Item } from '../types';
import clsx from 'clsx';
import { getThemeCard } from '../utils/card-themes.utils';
import { Card as DefaultCard } from '../themes/gtrex';
import type { ComponentType } from 'react';
import { useItemModal } from '../hooks/useItemModal';

interface WidgetProps {
  items: Item[];
  embedUrl: string;
  theme: string;
  showYear?: boolean;
}

const Widget = ({ items, embedUrl, theme, showYear = true }: WidgetProps) => {
  const { ItemModal, openItem } = useItemModal();
  const Card: ComponentType<CardProps> = getThemeCard(theme) || DefaultCard;

  return (
    <>
      <div className={clsx('daro-widget', styles.base, styles.widgetWrapper)}>
        {items.map((item) => (
          <Card
            item={item}
            key={item._id}
            showYear={showYear}
            setItem={() => openItem(item)}
          />
        ))}
      </div>
      <ItemModal embedUrl={embedUrl} />
    </>
  );
};

export default Widget;
