import type { ReactNode } from 'react';
import styles from './CardContent.module.css';
import clsx from 'clsx';

interface IconLabelProps {
  align?: 'start' | 'center' | 'end' | 'between';
  fill?: boolean;
  position?: 'top' | 'middle' | 'bottom';
  className?: string;
  children: ReactNode;
}

const CardContent = ({
  align = 'between',
  fill,
  position = 'middle',
  className,
  children,
}: IconLabelProps) => {
  return (
    <div
      className={clsx(
        styles.wrapper,
        styles[align],
        styles[position],
        fill && styles.fill,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardContent;
