import styles from './decorators.module.css';

const ItemPageContainer = ({ children }) => {
  return <div className={styles.itemPageWrapper}>{children}</div>;
};

export default ItemPageContainer;
