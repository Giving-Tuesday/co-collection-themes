import React, { memo } from 'react';

import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';

import theme from './theme.module.css';
import styles from './ItemPage.module.css';
import LinkButton from '../../LinkButton';

const Section = memo(({ heading, content, ctaLabel, ctaUrl }) => {
  if (!content || content.length === 0) return null;

  return (
    <>
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>{heading}</h2>
        <p className={styles.sectionContent}>{content}</p>
      </div>
      <LinkButton isCentered small url={ctaUrl}>
        {ctaLabel}
      </LinkButton>
    </>
  );
});

const ItemPage = ({ itemData }) => {
  if (!itemData?._id) return null;

  const { desc: description, title, custom_fields = {} } = itemData;
  const {
    access_details,
    access_request_url,
    data_contained,
    designed_for,
    key_supporters,
    learn_more,
    project_outputs,
    report_url,
    update_schedule,
    use_cases,
    website_url,
  } = custom_fields;

  const htmlDescription = useConvertToHtml(description);

  return (
    <BaseItemPage className={theme.root} data-theme="gtdc">
      <h1 className={styles.title}>{title}</h1>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: htmlDescription }}
      />
      <LinkButton isCentered url={website_url}>
        Access the Project Website
      </LinkButton>
      <hr className={styles.divider} />
      <Section
        heading="Project Outputs"
        content={project_outputs}
        ctaLabel="Read the Latest Report"
        ctaUrl={report_url}
      />
      <Section heading="Data Contained" content={data_contained} />
      <Section
        heading="Access Details"
        content={access_details}
        ctaLabel="Request Access to the Data"
        ctaUrl={access_request_url}
      />
      <Section heading="Update Schedule" content={update_schedule} />
      <Section heading="Designed For" content={designed_for} />
      <Section heading="Use Cases" content={use_cases} />
      <Section heading="Learn More" content={learn_more} />
      <Section
        heading="Key Supporters"
        content={key_supporters.map((supporter) => (
          <li>{supporter}</li>
        ))}
      />
    </BaseItemPage>
  );
};

export default ItemPage;
