import styles from './Thumbnail.module.css';

const Thumbnail = ({ src }) => {
  if (!src) return null;
  return <img className={`${styles.thumbnail}`} src={src} />;
};

export default Thumbnail;
