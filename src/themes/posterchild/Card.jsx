import PropTypes from 'prop-types';
import Badge from '../../Badge';
import CardContent from '../../CardContent';
import Title from '../../Title';
import IconLabel from '../../IconLabel';
import { linkTargetValidator } from '../../utils/prop-types.utils';
import { truncateText } from '../../utils/text.utils';

import BaseCard from '../../BaseCard';

import theme from './theme.module.css';
import styles from './Card.module.css';

const Card = ({ CustomLink, href, item, to }) => {
  const { title, custom_fields = {} } = item;
  const { initiative_type, project_image, short_description, website_url } =
    custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="gtrex">
      <CardContent align="end" position="top" className={styles.cardContentTop}>
        <Badge>{initiative_type}</Badge>
      </CardContent>
      <CardContent align="center" position="middle">
        {project_image ? (
          <div className={styles.thumbnailWrapper}>
            <img className={styles.thumbnail} src={project_image} />
          </div>
        ) : null}
        <Title
          {...{ CustomLink, href, to }}
          text={truncateText(title, 72)}
          className={styles.title}
        />
        {short_description ? (
          <div
            className={styles.shortDescription}
            dangerouslySetInnerHTML={{
              __html: truncateText(short_description, 125),
            }}
          />
        ) : null}
      </CardContent>
      <CardContent align="right" position="bottom">
        {website_url ? (
          <a
            className={`wp-element-button ${styles.externalSiteLink}`.trim()}
            href={website_url}
            target="_blank"
          >
            <IconLabel icon="External Link" label="Access the project site" />
          </a>
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
