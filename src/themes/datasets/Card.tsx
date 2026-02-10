import Badge from '../../Badge';
import CardContent from '../../CardContent';
import Title from '../../Title';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';
import theme from './theme.module.css';
import styles from './Card.module.css';
import type { Item } from '../../types';
import type { ElementType } from 'react';

interface CardProps {
  CustomLink?: ElementType | undefined;
  href: string;
  item: Item;
}

const Card = ({ CustomLink, href, item }: CardProps) => {
  const { title, custom_fields = {} } = item;
  const { dataset_type, short_desc } = custom_fields;
  return (
    <BaseCard className={theme.root}>
      <CardContent align="end" position="top">
        <Badge>{dataset_type}</Badge>
      </CardContent>
      <CardContent align="between" position="middle" className={styles.contentMiddle}>
        <div className={styles.imgWrapper}>
          {custom_fields.dataset_image ? (
            <img className={styles.img} src={custom_fields.dataset_image} />
          ) : null}
        </div>
        <Title {...{ CustomLink, href }} text={title} className={styles.title} />
        {short_desc ? (
          <p className={styles.shortDesc}>{truncateText(short_desc, 280)}</p>
        ) : null}
      </CardContent>
    </BaseCard>
  );
};

export default Card;
