import type { ElementType } from 'react';
import { findIcon, findIconByLabel } from '../settings/ICON_LIST';
import styles from './IconLabel.module.css';
import clsx from 'clsx';

interface IconLabelProps {
  as?: ElementType;
  icon?: string;
  label: string;
  type?: 'primary';
}

const IconLabel = ({
  as: Element = 'p',
  icon,
  label,
  type = 'primary',
}: IconLabelProps) => {
  const Icon = icon ? findIcon(icon) : findIconByLabel(label);
  return (
    <Element className={clsx(styles.iconLabel, styles[type])}>
      <span className={styles.iconContainer}>
        {Icon && (
          <Icon
            className={
              'icon' in styles && typeof styles.icon === 'string'
                ? styles.icon
                : undefined
            }
          />
        )}
      </span>
      <span>{label}</span>
    </Element>
  );
};

export default IconLabel;
