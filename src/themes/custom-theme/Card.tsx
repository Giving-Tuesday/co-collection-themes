import CardContent from '../../CardContent';
import Title from '../../Title';
import Thumbnail from '../../Thumbnail';
import ReadMore from '../../ReadMore';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';
import theme from './theme.module.css';
import styles from './Card.module.css';
import type { CardProps } from '../../types';

const Card = ({ href, item, setItem }: CardProps) => {
  const { author, title, custom_fields = {} } = item;
  const { resource_type, cover_url, year_published } = custom_fields;

  return (
    <BaseCard className={`${theme.root}`} data-theme="custom-theme">
      <CardContent position="top" className={styles.cardContentTop}>
        <Thumbnail src={cover_url} />
      </CardContent>
      <CardContent align="start" position="middle">
        <div className={styles.middleContainer}>
          {resource_type ? <p className={styles.resourceType}>{resource_type}</p> : null}
          {author && author.length > 0 ? (
            <p className={styles.author}>by {truncateText(author.join(', '), 70)}</p>
          ) : null}
        </div>
        <Title {...{ href, setItem }} text={title} className={styles.title} />
      </CardContent>
      <CardContent position="bottom" className={styles.cardContentBottom}>
        {year_published ? <p className={styles.year}>{year_published}</p> : null}
        <ReadMore {...{ href, setItem }} />
      </CardContent>
    </BaseCard>
  );
};

export default Card;
