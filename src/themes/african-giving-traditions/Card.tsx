import Badge from '../../Badge';
import CardContent from '../../CardContent';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';
import theme from './theme.module.css';
import styles from './Card.module.css';
import type { CardProps } from '../../types';
import { Author } from '../../Author';
import clsx from 'clsx';

const Card = ({ CustomLink, href, item, setItem }: CardProps) => {
  const { author, desc, title } = item;
  const { location } = item.custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="african-giving-traditions">
      <CardContent align="end" position="top">
        <Badge>{location}</Badge>
      </CardContent>
      <CardContent position="middle" align="start">
        <div className={styles.authorTitleContainer}>
          <Title
            {...{ CustomLink, href, setItem }}
            text={truncateText(title, 60)}
            className={clsx(styles.title, Author({ author }) && styles.titleWithAuthor)}
          />
          <Author author={author} />
        </div>
        {desc ? (
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: truncateText(desc, 125),
            }}
          />
        ) : null}
      </CardContent>
      <CardContent align="start" position="bottom">
        <ReadMore {...{ CustomLink, href, setItem }} />
      </CardContent>
    </BaseCard>
  );
};

export default Card;
