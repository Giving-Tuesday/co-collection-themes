// @ts-expect-error TS(2307): Cannot find module './Thumbnail.module.css' or its... Remove this comment to see the full error message
import styles from './Thumbnail.module.css';

const Thumbnail = ({
  src
}: any) => {
  if (!src) return null;
  return <img className={`${styles.thumbnail}`} src={src} />;
};

export default Thumbnail;
