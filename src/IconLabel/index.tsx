import { findIcon, findIconByLabel } from '../settings/ICON_LIST';
// @ts-expect-error TS(2307): Cannot find module './IconLabel.module.css' or its... Remove this comment to see the full error message
import styles from './IconLabel.module.css';

const IconLabel = ({
  as = 'p',
  icon,
  label,
  type = 'primary'
}: any) => {
  const Icon = icon ? findIcon(icon) : findIconByLabel(label);
  const Element = as;

  return (
    <Element className={`${styles.iconLabel} ${styles[type]}`}>
      <span className={styles.iconContainer}>
        // @ts-expect-error TS(2786): 'Icon' cannot be used as a JSX component.
        {Icon && <Icon className={styles.icon} />}
      </span>
      <span>{label}</span>
    </Element>
  );
};

export default IconLabel;
