// @ts-expect-error TS(2307): Cannot find module './decorators.module.css' or it... Remove this comment to see the full error message
import styles from './decorators.module.css';

const CardContainer = ({
  children
}: any) => {
  return <div className={styles.cardWrapper}>{children}</div>;
};

export default CardContainer;
