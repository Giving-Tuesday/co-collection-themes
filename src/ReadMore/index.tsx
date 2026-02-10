// @ts-expect-error TS(2307): Cannot find module './readMore.module.css' or its ... Remove this comment to see the full error message
import styles from './readMore.module.css';

const ReadMore = ({
  CustomLink,
  href,
  to,
  label = 'Read More',
  align = 'right'
}: any) => {
  const justify = align === 'right' ? 'flex-end' : 'flex-start';

  return (
    <div className={styles.wrapper} style={{ justifyContent: justify }}>
      {to ? (
        <CustomLink to={to}>{label}</CustomLink>
      ) : (
        <a href={href} className={styles.link}>
          {label}
        </a>
      )}
    </div>
  );
};

export default ReadMore;
