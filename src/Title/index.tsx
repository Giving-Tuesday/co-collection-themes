import styles from './title.module.css';

const Title = ({ className, CustomLink, height, href, text, to }) => {
  return (
    <p className={`${styles.title} ${className}`} style={{ height }}>
      {to ? (
        <CustomLink to={to}>{text}</CustomLink>
      ) : (
        <a href={href} className={styles.link}>
          {text}
        </a>
      )}
    </p>
  );
};

export default Title;
