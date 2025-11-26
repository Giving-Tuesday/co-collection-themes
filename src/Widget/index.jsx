import { getThemeCard } from '../utils/card-themes.utils';

import styles from './Widget.module.css';

const Widget = ({ items, widgetTheme, embedUrl, maxCardsPerRow = 5 }) => {
  const CardComponent = getThemeCard(widgetTheme);
  const itemCount = items?.length || 0;

  return (
    <div
      className={`daro-widget ${styles.base} ${
        styles[`count${Math.min(itemCount, maxCardsPerRow)}`]
      } ${styles.widgetWrapper}`}
    >
      {items?.map((item) => (
        <CardComponent key={item._id} href={`${embedUrl}?co=${item.slug}`} item={item} />
      ))}
    </div>
  );
};

export default Widget;
