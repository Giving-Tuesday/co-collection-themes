import type {
  ElementType,
  CSSProperties,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import styles from './title.module.css';
import clsx from 'clsx';
import type { Item } from '../types';

interface TitleProps extends HTMLAttributes<HTMLParagraphElement> {
  CustomLink?: ElementType | undefined;
  href: string;
  text: string;
  height?: CSSProperties['height'];
  setItem?: (() => void) | undefined;
}
const TitleWrapper = ({
  className,
  height,
  children,
  onClick,
}: {
  children: ReactNode;
  height?: CSSProperties['height'];
} & HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <div className={clsx(styles.title, className)} style={{ height }} onClick={onClick}>
      {children}
    </div>
  );
};

const Title = ({ className, CustomLink, height, href, text, setItem }: TitleProps) => {
  if (setItem) {
    return (
      <TitleWrapper className={className} height={height} onClick={() => setItem()}>
        <span>{text}</span>
      </TitleWrapper>
    );
  }
  if (CustomLink) {
    return (
      <TitleWrapper className={className} height={height}>
        <CustomLink href={href}>{text}</CustomLink>
      </TitleWrapper>
    );
  }
  return (
    <TitleWrapper className={className} height={height}>
      <a href={href}>{text}</a>
    </TitleWrapper>
  );
};

export default Title;
