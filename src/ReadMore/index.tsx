import type { ElementType } from 'react';
import styles from './readMore.module.css';

interface ReadMoreProps {
  CustomLink?: ElementType | undefined;
  href: string;
  label?: string;
  align?: 'right';
}

const ReadMore = ({
  CustomLink,
  href,
  label = 'Read More',
  align = 'right',
}: ReadMoreProps) => {
  const justify = align === 'right' ? 'flex-end' : 'flex-start';

  return (
    <div className={styles.wrapper} style={{ justifyContent: justify }}>
      {CustomLink ? (
        <CustomLink href={href}>{label}</CustomLink>
      ) : (
        <a
          href={href}
          className={
            'link' in styles && typeof styles.link === 'string' ? styles.link : undefined
          }
        >
          {label}
        </a>
      )}
    </div>
  );
};

export default ReadMore;
