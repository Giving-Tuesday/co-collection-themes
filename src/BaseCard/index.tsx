import styles from './BaseCard.module.css';
import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface BaseCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const BaseCard = ({ children, className, ...props }: BaseCardProps) => {
  return (
    <div className={clsx('daro-card', styles.base, styles.wrapper, className)} {...props}>
      {children}
    </div>
  );
};

export default BaseCard;

/**
 * Alias of BaseCard for semantic usage in layout composition.
 * @see BaseCard
 */
export const CardWrapper = BaseCard;
