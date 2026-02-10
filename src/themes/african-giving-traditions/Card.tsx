import Badge from '../../Badge';
import CardContent from '../../CardContent';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';
import theme from './theme.module.css';
import styles from './Card.module.css';
import type { ElementType } from 'react';
import type { Item } from '../../types';

interface CardProps {
  CustomLink?: ElementType | undefined;
  href: string;
  item: Item;
}

const Card = ({ CustomLink, href, item }: CardProps) => {
  const { author, desc, title } = item;
  const { location } = item.custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="african-giving-traditions">
      <CardContent align="end" position="top">
        <Badge>{location}</Badge>
      </CardContent>
      <CardContent position="middle">
        <Title {...{ CustomLink, href }} text={truncateText(title, 40)} height="52px" />
        <div className={styles.authorContainer}>
          {item.author ? (
            <p className={styles.author}>
              by {author ? truncateText(author.join(', '), 100) : 'Unknown Author'}
            </p>
          ) : null}
        </div>
        {desc ? (
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: truncateText(item.desc, 125),
            }}
          />
        ) : null}
      </CardContent>
      <CardContent align="start" position="bottom">
        <ReadMore {...{ CustomLink, href }} />
      </CardContent>
    </BaseCard>
  );
};

export default Card;
