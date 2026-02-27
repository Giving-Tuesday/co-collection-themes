import CardContent from '../../CardContent';
import Title from '../../Title';
import BaseCard from '../../BaseCard';
import { getDataYearsLabels } from '../../utils/text.utils';
import theme from './theme.module.css';
import styles from './Card.module.css';
import type { CardProps } from '../../types';

const Card = ({ CustomLink, href, item, setItem }: CardProps) => {
  const { title, custom_fields } = item;
  const { data_years, image_url } = custom_fields;

  const yearsLabel = getDataYearsLabels(data_years);

  return (
    <BaseCard className={`${theme.root}`} data-theme="viz-database">
      <CardContent position="top">
        {yearsLabel ? <p className={styles.years}>{yearsLabel}</p> : null}
      </CardContent>
      <CardContent align="start">
        <Title
          {...{ CustomLink, href, setItem }}
          text={item.title}
          className={styles.title}
        />
        {image_url ? (
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={image_url} alt={title} />
          </div>
        ) : null}
      </CardContent>
    </BaseCard>
  );
};

export default Card;
