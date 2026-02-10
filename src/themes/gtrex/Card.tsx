import CardContent from '../../CardContent';
import IconLabel from '../../IconLabel';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import { truncateText } from '../../utils/text.utils';
import BaseCard from '../../BaseCard';
import theme from './theme.module.css';
import styles from './Card.module.css';
import type { ElementType } from 'react';
import type { Item } from '../../types';

export interface CardProps {
  CustomLink?: ElementType | undefined;
  href: string;
  item: Item;
  showYear?: boolean;
}

const Card = ({ CustomLink, href, item, showYear = true }: CardProps) => {
  const { author, title, custom_fields = {} } = item;
  const { resource_type } = custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="gtrex">
      <CardContent align="start" position="top" className={styles.cardContentTop}>
        {resource_type ? <IconLabel label={resource_type} /> : null}
      </CardContent>
      <CardContent align="start" position="middle">
        <Title text={title} className={styles.title} {...{ CustomLink, href }} />
        <div className={styles.authorContainer}>
          {author && author.length > 0 ? (
            <p className={styles.author}>by {truncateText(author.join(', '), 100)}</p>
          ) : null}
        </div>
      </CardContent>
      <CardContent align={showYear ? 'between' : 'end'} position="bottom">
        {showYear && (
          <p className={styles.yearPublished}>{custom_fields.year_published}</p>
        )}
        <ReadMore {...{ CustomLink, href }} />
      </CardContent>
    </BaseCard>
  );
};

export default Card;
