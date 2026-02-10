import type { HTMLAttributes, ReactNode } from 'react';
import styles from './LinkButton.module.css';
import clsx from 'clsx';

interface LinkButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  url: string;
  children: ReactNode;
  type?: 'primary';
  newWindow?: boolean;
  xsmall?: boolean;
  small?: boolean;
  isCentered?: boolean;
}

const LinkButton = ({
  url,
  children,
  type = 'primary',
  newWindow = false,
  xsmall,
  small,
  isCentered,
  ...props
}: LinkButtonProps) => {
  if (!url || url.length === 0) return null;
  return (
    <a
      href={url}
      className={clsx(
        styles.linkButton,
        styles[type],
        xsmall && styles.xsmall,
        small && styles.small,
        isCentered && styles.isCentered,
      )}
      {...{ target: newWindow ? '_blank' : undefined }}
      {...props}
    >
      {children}
    </a>
  );
};

export default LinkButton;
