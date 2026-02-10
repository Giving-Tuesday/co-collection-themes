// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import CardContent from '../../CardContent';
import Title from '../../Title';
import { linkTargetValidator } from '../../utils/prop-types.utils';
import BaseCard from '../../BaseCard';
import { getDataYearsLabels } from '../../utils/text.utils';

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
