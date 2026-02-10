import styles from './CardContent.module.css';

const CardContent = ({ align = 'between', fill, position, className, children }) => {
  const alignKey = (align || '').toLowerCase();
  const positionKey = (position || '').toLowerCase();

  const variantAlign = styles[alignKey] || styles.left;
  const variantPosition = styles[positionKey] || '';
  const fillClass = fill ? styles.fill : '';
  return (
    <div
      className={`${styles.wrapper} ${variantAlign} ${variantPosition} ${fillClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default CardContent;
