import { memo } from 'react';
import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';
// @ts-expect-error TS(2307): Cannot find module './theme.module.css' or its cor... Remove this comment to see the full error message
import theme from './theme.module.css';
// @ts-expect-error TS(2307): Cannot find module './ItemPage.module.css' or its ... Remove this comment to see the full error message
import styles from './ItemPage.module.css';
import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';
import { displayArrayItems, getAvailableUrls } from '../../utils/item-page.utils';

// Configuration for CTA labels
const CTA_LABELS = {
  SLIDE: 'Access Presentation Deck',
  REPORT: 'Access Report',
  TEMPLATE: 'Access Template',
  VISUALIZATION: 'Access Visualization',
};

// Configuration for datapoints
const DATAPOINTS_CONFIG = [
  { key: 'data_years', label: 'Year(s) Represented' },
  { key: 'topic', label: 'Topic' },
  { key: 'presentation_date', label: 'Presentation Date' },
  { key: 'viz_type', label: 'Visualization Type' },
  { key: 'event_name', label: 'Event' },
  { key: 'author', label: 'Author' },
  { key: 'source', label: 'Source' },
];

// @ts-expect-error TS(2339): Property 'label' does not exist on type '{}'.
const DatapointsItem = memo(({ label, value }) => {
  if (!value) return null;
  return (
    <li className={styles.datapointItem}>
      <p className={styles.datapointLabel}>{label}</p>
      <p className={styles.datapointValue}>{displayArrayItems(value)}</p>
    </li>
  );
});

const ItemPage = ({
  itemData
}: any) => {
  if (!itemData?._id) return null;

  const { author, title, desc, custom_fields = {} } = itemData;
  const { image_url } = custom_fields;

  const htmlDescription = useConvertToHtml(desc);
  const additionalCtaUrl = getAvailableUrls(custom_fields, CTA_LABELS);
  const hasAdditionalCta = Boolean(additionalCtaUrl);

  return (
    <BaseItemPage className={theme.root} data-theme="viz-database">
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        <img src={image_url} alt={`${title} image`} className={styles.image} />
        <div
          className={styles.description}
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | Tr... Remove this comment to see the full error message
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
        />
      </div>
      <div className={styles.ctaBar}>
        <LinkButton newWindow url={image_url}>
          <IconLabel as="span" icon="External Link" label={CTA_LABELS.VISUALIZATION} />
        </LinkButton>
        {hasAdditionalCta && (
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          <LinkButton newWindow url={additionalCtaUrl.url}>
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            <IconLabel as="span" icon="External Link" label={additionalCtaUrl.label} />
          </LinkButton>
        )}
      </div>
      <div className={styles.datapointWrapper}>
        <ul className={styles.datapoints}>
          {DATAPOINTS_CONFIG.map(({ key, label }) => (
            <DatapointsItem
              key={key}
              // @ts-expect-error TS(2322): Type '{ key: string; label: string; value: any; }'... Remove this comment to see the full error message
              label={label}
              value={key === 'author' ? author : custom_fields[key]}
            />
          ))}
        </ul>
      </div>
    </BaseItemPage>
  );
};

export default ItemPage;
