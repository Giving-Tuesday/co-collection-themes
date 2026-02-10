import React from 'react';

import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';

import theme from './theme.module.css';
import styles from './ItemPage.module.css';

import { Action, Datapoint } from '../datamarts/ItemPage'; // Reuse components from datamarts theme

const ItemPage = ({ itemData }) => {
  if (!itemData?._id) return null;

  const { author, desc: description, title, custom_fields = {} } = itemData;
  const {
    access_level,
    access_request,
    dataset_documentation,
    dataset_image,
    dataset_type,
    gtdc_project,
    region,
    topics,
    year_published,
    website_url,
  } = custom_fields;

  const htmlDescription = useConvertToHtml(description);
  const gtdcProjectHtml = useConvertToHtml(gtdc_project);

  return (
    <BaseItemPage className={theme.root} data-theme="datamarts">
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.actions}>
        <Action icon="IoIosOpen" label="Go to Project Site" url={website_url} />
        <Action
          icon="CgFileDocument"
          label="View Data Documentation"
          url={dataset_documentation}
        />
        <Action icon="BsDatabaseFill" label="Access Data" url={access_request} />
      </div>
      <div className={styles.mainContent}>
        {dataset_image ? <img src={dataset_image} alt={title} /> : null}
        <div
          className={styles.htmlDescription}
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
        />
      </div>
      <div className={styles.datapoints}>
        <Datapoint label="Dataset Type" data={dataset_type} />
        {gtdcProjectHtml?.length > 0 ? (
          <Datapoint
            label="Associated GivingTuesday Initiative"
            data={
              <span
                dangerouslySetInnerHTML={{
                  __html: gtdcProjectHtml,
                }}
              />
            }
          />
        ) : null}
        <Datapoint label="Topic(s)" data={topics?.join(', ')} />
        <Datapoint label="Author(s)" data={author?.join(', ')} />
        <Datapoint label="Region(s)" data={region?.join(', ')} />
        <Datapoint label="Access Level" data={access_level} />
        <Datapoint label="Latest Data" data={year_published} />
      </div>
    </BaseItemPage>
  );
};

export default ItemPage;
