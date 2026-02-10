import type { HTMLAttributes, ReactNode } from 'react';
import styles from './BaseItemPage.module.css';
import clsx from 'clsx';

interface BaseItemPageProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const BaseItemPage = ({ children, className, ...props }: BaseItemPageProps) => {
  return (
    <article
      className={clsx('daro-item-page', styles.base, styles.wrapper, className)}
      {...props}
    >
      {children}
    </article>
  );
};

export default BaseItemPage;

/**
 * Alias of BaseItemPage for semantic usage in layout composition.
 * @see BaseItemPage
 */
export const ItemPageWrapper = BaseItemPage;
