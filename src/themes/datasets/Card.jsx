import PropTypes from 'prop-types';
import Badge from '../../Badge';
import CardContent from '../../CardContent';
import Title from '../../Title';
import { linkTargetValidator } from '../../utils/prop-types.utils';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';

import theme from './theme.module.css';
import styles from './Card.module.css';

const Card = ({ CustomLink, href, item, to }) => {
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
        <Title {...{ CustomLink, href, to }} text={title} className={styles.title} />
        {short_desc ? (
          <p className={styles.shortDesc}>{truncateText(short_desc, 280)}</p>
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
    custom_fields: PropTypes.shape({
      dataset_image: PropTypes.string,
      dataset_type: PropTypes.string,
      short_desc: PropTypes.string,
    }),
  }).isRequired,
};

export default Card;
