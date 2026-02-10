import React, { memo } from 'react';

import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';

// @ts-expect-error TS(2307): Cannot find module './theme.module.css' or its cor... Remove this comment to see the full error message
import theme from './theme.module.css';
// @ts-expect-error TS(2307): Cannot find module './ItemPage.module.css' or its ... Remove this comment to see the full error message
import styles from './ItemPage.module.css';
import LinkButton from '../../LinkButton';

// @ts-expect-error TS(2339): Property 'heading' does not exist on type '{}'.
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

const ItemPage = ({
  itemData
}: any) => {
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
      <h2 className={styles.title}>{title}</h2>
      <div
        className={styles.description}
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | Tr... Remove this comment to see the full error message
        dangerouslySetInnerHTML={{ __html: htmlDescription }}
      />
      <LinkButton isCentered url={website_url}>
        Access the Project Website
      </LinkButton>
      <hr className={styles.divider} />
      <Section
        // @ts-expect-error TS(2322): Type '{ heading: string; content: any; ctaLabel: s... Remove this comment to see the full error message
        heading="Project Outputs"
        content={project_outputs}
        ctaLabel="Read the Latest Report"
        ctaUrl={report_url}
      />
      // @ts-expect-error TS(2322): Type '{ heading: string; content: any; }' is not a... Remove this comment to see the full error message
      <Section heading="Data Contained" content={data_contained} />
      <Section
        // @ts-expect-error TS(2322): Type '{ heading: string; content: any; ctaLabel: s... Remove this comment to see the full error message
        heading="Access Details"
        content={access_details}
        ctaLabel="Request Access to the Data"
        ctaUrl={access_request_url}
      />
      // @ts-expect-error TS(2322): Type '{ heading: string; content: any; }' is not a... Remove this comment to see the full error message
      <Section heading="Update Schedule" content={update_schedule} />
      // @ts-expect-error TS(2322): Type '{ heading: string; content: any; }' is not a... Remove this comment to see the full error message
      <Section heading="Designed For" content={designed_for} />
      // @ts-expect-error TS(2322): Type '{ heading: string; content: any; }' is not a... Remove this comment to see the full error message
      <Section heading="Use Cases" content={use_cases} />
      // @ts-expect-error TS(2322): Type '{ heading: string; content: any; }' is not a... Remove this comment to see the full error message
      <Section heading="Learn More" content={learn_more} />
      <Section
        // @ts-expect-error TS(2322): Type '{ heading: string; content: any; }' is not a... Remove this comment to see the full error message
        heading="Key Supporters"
        content={key_supporters.map((supporter: any) => <li>{supporter}</li>)}
      />
    </BaseItemPage>
  );
};

export default ItemPage;
