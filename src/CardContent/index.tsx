// @ts-expect-error TS(2307): Cannot find module './CardContent.module.css' or i... Remove this comment to see the full error message
import styles from './CardContent.module.css';

const CardContent = ({
  align = 'between',
  fill,
  position,
  className,
  children
}: any) => {
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
