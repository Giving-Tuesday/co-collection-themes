// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import CardContent from '../../CardContent';
import IconLabel from '../../IconLabel';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import { linkTargetValidator } from '../../utils/prop-types.utils';
import { truncateText } from '../../utils/text.utils';

import BaseCard from '../../BaseCard';

// @ts-expect-error TS(2307): Cannot find module './theme.module.css' or its cor... Remove this comment to see the full error message
import theme from './theme.module.css';
// @ts-expect-error TS(2307): Cannot find module './Card.module.css' or its corr... Remove this comment to see the full error message
import styles from './Card.module.css';

const Card = ({
  CustomLink,
  href,
  item,
  to,
  showYear = true
}: any) => {
  const { author, title, custom_fields = {} } = item;
  const { resource_type } = custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="gtrex">
      <CardContent align="start" position="top" className={styles.cardContentTop}>
        {resource_type ? <IconLabel label={resource_type} /> : null}
      </CardContent>
      <CardContent align="start" position="middle">
        <Title text={title} className={styles.title} {...{ CustomLink, href, to }} />
        <div className={styles.authorContainer}>
          {author.length > 0 ? (
            <p className={styles.author}>by {truncateText(author.join(', '), 100)}</p>
          ) : null}
        </div>
      </CardContent>
      <CardContent align={showYear ? 'between' : 'end'} position="bottom">
        {showYear && (
          <p className={styles.yearPublished}>{custom_fields.year_published}</p>
        )}
        <ReadMore {...{ CustomLink, href, to }} />
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
