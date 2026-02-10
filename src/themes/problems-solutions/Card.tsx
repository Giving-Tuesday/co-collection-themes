// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import CardContent from '../../CardContent';
import IconLabel from '../../IconLabel';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import { linkTargetValidator } from '../../utils/prop-types.utils';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';

// @ts-expect-error TS(2307): Cannot find module './theme.module.css' or its cor... Remove this comment to see the full error message
import theme from './theme.module.css';
// @ts-expect-error TS(2307): Cannot find module './Card.module.css' or its corr... Remove this comment to see the full error message
import styles from './Card.module.css';

const Card = ({
  CustomLink,
  href,
  item,
  to
}: any) => {
  const { author, title, custom_fields = {} } = item;
  const { item_type, short_desc } = custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="problems-solutions">
      <CardContent align="start" position="top" className={styles.cardContentTop}>
        {item_type ? <IconLabel label={item_type} /> : null}
      </CardContent>
      <CardContent position="middle">
        <Title {...{ CustomLink, href, to }} text={title} className={styles.title} />
        <div className={styles.authorContainer}>
          {author[0].length > 0 ? (
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
        <ReadMore {...{ CustomLink, href, to }} />
      </CardContent>
    </BaseCard>
  );
};

Card.propTypes = {
  CustomLink: PropTypes.elementType,
  href: linkTargetValidator,
  to: linkTargetValidator,
  item: PropTypes.shape({}).isRequired,
};

export default Card;
