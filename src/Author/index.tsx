import { truncateText } from '../utils/text.utils';
import styles from './Author.module.css';

export const Author = ({ author }: { author: string[] | undefined }) => {
  if (!author) return null;
  const authorString = author.join(', ');
  if (authorString.length < 1) return null;
  return <p className={styles.author}>by {truncateText(authorString, 100)}</p>;
};
