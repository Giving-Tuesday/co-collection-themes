import styles from './readMore.module.css';

const ReadMore = ({ CustomLink, href, to, label = 'Read More', align = 'right' }) => {
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
