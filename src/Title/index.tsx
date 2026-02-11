import type { ElementType, CSSProperties, HTMLAttributes } from 'react';
import styles from './title.module.css';
import clsx from 'clsx';

interface TitleProps extends HTMLAttributes<HTMLParagraphElement> {
  CustomLink?: ElementType | undefined;
  href: string;
  text: string;
  height?: CSSProperties['height'];
}

const Title = ({ className, CustomLink, height, href, text }: TitleProps) => {
  return (
    <p className={clsx(styles.title, className)} style={{ height }}>
      {CustomLink ? (
        <CustomLink href={href}>{text}</CustomLink>
      ) : (
        <a
          href={href}
          className={
            'link' in styles && typeof styles.link === 'string' ? styles.link : undefined
          }
        >
          {text}
        </a>
      )}
    </p>
  );
};

export default Title;
