import { getThemeCard } from '../utils/card-themes.utils';

// @ts-expect-error TS(2307): Cannot find module './Widget.module.css' or its co... Remove this comment to see the full error message
import styles from './Widget.module.css';

const Widget = ({
  items,
  widgetTheme,
  embedUrl,
  maxCardsPerRow = 5
}: any) => {
  const CardComponent = getThemeCard(widgetTheme);
  const itemCount = items?.length || 0;

  return (
    <div className={`daro-widget ${styles.base} ${styles.widgetWrapper}`}>
      {items?.map((item: any) => <CardComponent
        key={item._id}
        href={`${embedUrl}?co-item=${item.slug}&from=widget`}
        item={item}
      />)}
    </div>
  );
};

export default Widget;
