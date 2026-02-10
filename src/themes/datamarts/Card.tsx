import { FaStar } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import Badge from '../../Badge';
import CardContent from '../../CardContent';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import { linkTargetValidator } from '../../utils/prop-types.utils';
import BaseCard from '../../BaseCard';
import { arrayToString, convertFileSize, truncateText } from '../../utils/text.utils';

import theme from './theme.module.css';
import styles from './Card.module.css';

const Card = ({ CustomLink, href, item, to }) => {
  const { title, desc, custom_fields = {} } = item;
  const { form_type, recently_added, size } = custom_fields;

  return (
    <BaseCard
      className={`${theme.root} ${recently_added ? theme.recentlyAddedBorder : ''}   `}
      data-theme="datamarts"
    >
      <CardContent position="top">
        <Badge>{form_type}</Badge>
        <p className={styles.fileSize}>{convertFileSize(size)}</p>
      </CardContent>
      <CardContent position="middle">
        <Title
          {...{ CustomLink, href, to }}
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
        <ReadMore {...{ CustomLink, href, label: 'Learn More', to }} />
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

Card.propTypes = {
  CustomLink: PropTypes.elementType,
  href: linkTargetValidator,
  to: linkTargetValidator,
  item: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    author: PropTypes.arrayOf(PropTypes.string),
    custom_fields: PropTypes.shape({
      form_type: PropTypes.string,
      part: PropTypes.arrayOf(PropTypes.string),
      recently_added: PropTypes.bool,
      size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default Card;
