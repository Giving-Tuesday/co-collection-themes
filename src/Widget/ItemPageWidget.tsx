import styles from './Widget.module.css';

const ItemPageWidget = ({
  items,
  CardComponent,
  embedUrl,
  maxCardsPerRow = 5,
  showYear,
}) => {
  const itemCount = items?.length || 0;

  if (!CardComponent) {
    console.warn('[ItemPageWidget] No CardComponent provided');
    return null;
  }

  return (
    <div
      className={`daro-widget ${styles.base} 
      ${styles[`count${Math.min(itemCount, maxCardsPerRow)}`]} 
      ${styles.widgetWrapper}`}
    >
      {items?.map((item) => (
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
