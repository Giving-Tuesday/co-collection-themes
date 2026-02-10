import styles from './Badge.module.css';

const Badge = ({ children }) => {
  if (!children) {
    return null;
  }

  return <div className={styles.wrapper}>{children}</div>;
};

export default Badge;
