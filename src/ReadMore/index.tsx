import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react';
import styles from './readMore.module.css';

interface ReadMoreProps {
  align?: 'right' | undefined;
  CustomLink?: ElementType | undefined;
  href?: string | undefined;
  label?: string | undefined;
  setItem?: (() => void) | undefined;
}

const ReadMoreWrapper = ({
  children,
  align = 'right',
  onClick,
}: { children: ReactNode; align?: 'right' } & HTMLAttributes<HTMLDivElement>) => {
  const justify = align === 'right' ? 'flex-end' : 'flex-start';
  return (
    <div className={styles.wrapper} style={{ justifyContent: justify }} onClick={onClick}>
      {children}
    </div>
  );
};

const ReadMore = ({
  CustomLink,
  href,
  label = 'Read More',
  align = 'right',
  setItem,
}: ReadMoreProps) => {
  const handleClick = () => {
    if (!setItem) return;
    setItem();
  };
  if (setItem) {
    return (
      <ReadMoreWrapper align={align} onClick={handleClick}>
        <p>{label}</p>
      </ReadMoreWrapper>
    );
  }
  if (CustomLink) {
    return (
      <ReadMoreWrapper align={align}>
        <CustomLink href={href}>{label}</CustomLink>
      </ReadMoreWrapper>
    );
  }
  return (
    <ReadMoreWrapper align={align}>
      <a
        href={href}
        className={
          'link' in styles && typeof styles.link === 'string' ? styles.link : undefined
        }
      >
        {label}
      </a>
    </ReadMoreWrapper>
  );
};

export default ReadMore;
