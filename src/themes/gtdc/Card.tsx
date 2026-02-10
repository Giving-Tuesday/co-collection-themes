import PropTypes from 'prop-types';
import CardContent from '../../CardContent';
import IconLabel from '../../IconLabel';
import LinkButton from '../../LinkButton';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';
import { linkTargetValidator } from '../../utils/prop-types.utils';

import theme from './theme.module.css';
import styles from './Card.module.css';

const Card = ({ CustomLink, href, item, to }) => {
  const { title } = item || {};
  const { short_description, report_url } = item?.custom_fields || {};

  return (
    <BaseCard className={theme.root} data-theme="gtdc">
      <CardContent position="middle">
        <Title
          {...{ CustomLink, href, to }}
          text={truncateText(title, 40)}
          height="52px"
        />
        {short_description ? (
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: truncateText(short_description, 250),
            }}
          />
        ) : null}
        <LinkButton small url={report_url}>
          <IconLabel as="span" icon="link" label="Read the latest report" />
        </LinkButton>
      </CardContent>
      <CardContent align="end" position="bottom">
        <ReadMore {...{ CustomLink, href, label: 'Learn More', to }} />
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
      location: PropTypes.string,
    }),
  }).isRequired,
};

export default Card;
