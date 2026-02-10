// @ts-expect-error TS(2307): Cannot find module './Badge.module.css' or its cor... Remove this comment to see the full error message
import styles from './Badge.module.css';

const Badge = ({
  children
}: any) => {
  if (!children) {
    return null;
  }

  return <div className={styles.wrapper}>{children}</div>;
};

export default Badge;
