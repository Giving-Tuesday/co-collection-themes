import PropTypes from 'prop-types';
import CardContent from '../../CardContent';
import Title from '../../Title';
import { linkTargetValidator } from '../../utils/prop-types.utils';
import BaseCard from '../../BaseCard';
import { getDataYearsLabels } from '../../utils/text.utils';

import theme from './theme.module.css';
import styles from './Card.module.css';

const Card = ({ CustomLink, href, item, to }) => {
  const { title, custom_fields = {} } = item;
  const { data_years, image_url } = custom_fields;

  const yearsLabel = getDataYearsLabels(data_years);

  return (
    <BaseCard className={`${theme.root} `} data-theme="viz-database">
      <CardContent position="top">
        {yearsLabel ? <p className={styles.years}>{yearsLabel}</p> : null}
      </CardContent>
      <CardContent fill position="middle">
        <Title
          {...{ CustomLink, href, to }}
          text={item.title}
          height="100px"
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

Card.propTypes = {
  CustomLink: PropTypes.elementType,
  href: linkTargetValidator,
  to: linkTargetValidator,
  item: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    author: PropTypes.arrayOf(PropTypes.string),
    custom_fields: PropTypes.shape({}),
  }).isRequired,
};

export default Card;
