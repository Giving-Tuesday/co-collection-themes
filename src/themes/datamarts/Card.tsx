import { FaStar } from 'react-icons/fa6';
import Badge from '../../Badge';
import CardContent from '../../CardContent';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import BaseCard from '../../BaseCard';
import { arrayToString, convertFileSize, truncateText } from '../../utils/text.utils';
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
  const { title, desc, custom_fields = {} } = item;
  const { form_type, recently_added, size } = custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="datamarts">
      <CardContent position="top">
        <Badge>{form_type}</Badge>
        <p className={styles.fileSize}>{convertFileSize(size)}</p>
      </CardContent>
      <CardContent position="middle">
        <Title
          {...{ CustomLink, href }}
          text={title}
          height="52px"
          className={styles.title}
        />
        {custom_fields.part ? (
          <p className={styles.part}>{`Part(s) ${arrayToString(custom_fields.part)}`}</p>
        ) : null}
        {desc ? <p className={styles.desc}>{truncateText(desc, 110)}</p> : null}
      </CardContent>
      <CardContent align="end" position="bottom">
        <ReadMore {...{ CustomLink, href, label: 'Learn More' }} />
      </CardContent>
      {recently_added ? (
        <>
          <span className={styles.recentlyAdded} />
          <span className={styles.recentIcon}>
            <FaStar />
          </span>
        </>
      ) : null}
    </BaseCard>
  );
};

export default Card;
