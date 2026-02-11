import { getThemeCard } from '../utils/card-themes.utils';
import styles from './Widget.module.css';

const Widget = ({ items, widgetTheme, embedUrl }: any) => {
  const CardComponent = getThemeCard(widgetTheme);

  return (
    <div className={`daro-widget ${styles.base} ${styles.widgetWrapper}`}>
      {items?.map((item: any) => (
        <CardComponent
          key={item._id}
          href={`${embedUrl}?co-item=${item.slug}&from=widget`}
          item={item}
        />
      ))}
    </div>
  );
};

export default Widget;
