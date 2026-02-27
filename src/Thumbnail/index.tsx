import styles from './Thumbnail.module.css';

const Thumbnail = ({ src }: { src: string }) => {
  if (!src) return null;
  return <img className={`${styles.thumbnail}`} src={src} />;
};

export default Thumbnail;
