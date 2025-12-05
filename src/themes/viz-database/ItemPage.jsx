import React, { memo } from 'react';

import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';

import theme from './theme.module.css';
import styles from './ItemPage.module.css';
import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';

const DatapointsItem = memo(({ label, value }) => {
  if (!value) return null;

  const displayArrayItems = (val) => <>{Array.isArray(val) ? val.join(', ') : val}</>;
  return (
    <li className={styles.datapointItem}>
      <p className={styles.datapointLabel}>{label}</p>
      <p className={styles.datapointValue}>{displayArrayItems(value)}</p>
    </li>
  );
});

const ItemPage = ({ itemData }) => {
  if (!itemData?._id) return null;

  const { author, title, desc, custom_fields = {} } = itemData;
  const {
    image_url,
    data_years,
    event_name,
    presentation_date,
    report_url,
    slide_url,
    source,
    template_url,
    topic,
    viz_type,
  } = custom_fields;

  const htmlDescription = useConvertToHtml(desc);
  const additionalCta =
    slide_url?.length > 0 || report_url?.length > 0 || template_url?.length > 0;
  const getAdditionalCtaText = (slide_url, report_url, template_url) => {
    return (
      (slide_url && 'Access Presentation Deck') ||
      (report_url && 'Access Report') ||
      (template_url && 'Access Template')
    );
  };

  return (
    <BaseItemPage className={theme.root} data-theme="viz-database">
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        <img src={image_url} alt={`${title} image`} className={styles.image} />
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
        />
      </div>
      <div className={styles.ctaBar}>
        <LinkButton newWindow url={image_url}>
          <IconLabel as="span" icon="External Link" label="Access Visualization" />
        </LinkButton>
        {additionalCta && (
          <LinkButton newWindow url={slide_url || report_url || template_url}>
            <IconLabel
              as="span"
              icon="External Link"
              label={getAdditionalCtaText(slide_url, report_url, template_url)}
            />
          </LinkButton>
        )}
      </div>
      <div className={styles.datapointWrapper}>
        <ul className={styles.datapoints}>
          <DatapointsItem label="Year(s) Represented" value={data_years} />
          <DatapointsItem label="Topic" value={topic} />
          <DatapointsItem label="Presentation Date" value={presentation_date} />
          <DatapointsItem label="Visualization Type" value={viz_type} />
          <DatapointsItem label="Event" value={event_name} />
          <DatapointsItem label="Author" value={author} />
          <DatapointsItem label="Source" value={source} />
        </ul>
      </div>
    </BaseItemPage>
  );
};

export default ItemPage;
