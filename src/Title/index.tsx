// @ts-expect-error TS(2307): Cannot find module './title.module.css' or its cor... Remove this comment to see the full error message
import styles from './title.module.css';

const Title = ({
  className,
  CustomLink,
  height,
  href,
  text,
  to
}: any) => {
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
