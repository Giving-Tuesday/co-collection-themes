import styles from './Widget.module.css';

const ItemPageWidget = ({
  items,
  CardComponent,
  embedUrl,
  maxCardsPerRow = 5,
  ...props
}) => {
  const itemCount = items?.length || 0;

  if (!CardComponent) {
    console.warn('[ItemPageWidget] No CardComponent provided');
    return null;
  }

  return (
    <div
      className={`daro-widget ${styles.base} 
      ${
        styles[`count${Math.min(itemCount, maxCardsPerRow)}`]
      } 
      ${styles.widgetWrapper}`}
      {...props}
    >
      {items?.map((item) => (
        <CardComponent
          key={item._id}
          href={`${embedUrl}?co-item=${item.slug}`}
          item={item}
        />
      ))}
    </div>
  );
};

export default ItemPageWidget;
