import CardContent from '../../CardContent';
import IconLabel from '../../IconLabel';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';
import theme from './theme.module.css';
import styles from './Card.module.css';
import type { CardProps } from '../../types';

const Card = ({ CustomLink, href, item, setItem }: CardProps) => {
  const { author, title, custom_fields } = item;
  const { item_type, short_desc } = custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="problems-solutions">
      <CardContent align="start" position="top" className={styles.cardContentTop}>
        {item_type ? <IconLabel label={item_type} /> : null}
      </CardContent>
      <CardContent position="middle">
        <Title {...{ CustomLink, href, setItem }} text={title} className={styles.title} />
        <div className={styles.authorContainer}>
          {author && author.length > 0 ? (
            <p className={styles.author}>by {truncateText(author.join(', '), 100)}</p>
          ) : null}
        </div>
        {short_desc ? (
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: truncateText(short_desc, 125),
            }}
          />
        ) : null}
      </CardContent>
      <CardContent align="end" position="bottom">
        <ReadMore {...{ CustomLink, href, setItem }} />
      </CardContent>
    </BaseCard>
  );
};

export default Card;
