import type { ReactNode } from 'react';
import styles from './Badge.module.css';

const Badge = ({ children }: { children: ReactNode }) => {
  if (!children) return null;
  return <div className={styles.wrapper}>{children}</div>;
};

export default Badge;
