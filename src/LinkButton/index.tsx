import type { HTMLAttributes, ReactNode } from 'react';
import styles from './LinkButton.module.css';
import clsx from 'clsx';

interface LinkButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  url: string;
  children: ReactNode;
  type?: 'primary' | 'secondary' | 'ghost';
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
  className,
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
        className,
      )}
      {...(newWindow ? { target: '_blank', rel: 'noreferrer' } : undefined)}
      {...props}
    >
      {children}
    </a>
  );
};

export default LinkButton;
