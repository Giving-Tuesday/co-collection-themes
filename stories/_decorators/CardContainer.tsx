import styles from './decorators.module.css';

const CardContainer = ({ children }) => {
  return <div className={styles.cardWrapper}>{children}</div>;
};

export default CardContainer;
