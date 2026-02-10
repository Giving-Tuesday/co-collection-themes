// @ts-expect-error TS(2307): Cannot find module './decorators.module.css' or it... Remove this comment to see the full error message
import styles from './decorators.module.css';

const ItemPageContainer = ({
  children
}: any) => {
  return <div className={styles.itemPageWrapper}>{children}</div>;
};

export default ItemPageContainer;
