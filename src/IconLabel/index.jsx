import { findIcon, findIconByLabel } from '../settings/ICON_LIST';
import styles from './IconLabel.module.css';

const IconLabel = ({ as = 'p', icon, label, type = 'primary' }) => {
  const Icon = icon ? findIcon(icon) : findIconByLabel(label);
  const Element = as;

  return (
    <Element className={`${styles.iconLabel} ${styles[type]}`}>
      <span className={styles.iconContainer}>
        {Icon && <Icon className={styles.icon} />}
      </span>
      <span>{label}</span>
    </Element>
  );
};

export default IconLabel;
