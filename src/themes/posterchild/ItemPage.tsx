import React from 'react';

import BaseItemPage from '../../BaseItemPage';
import { Card as GtrexCard } from '../gtrex';
import { Card as VizDatabaseCard } from '../viz-database';
import { Card as DatasetsCard } from '../datasets';
import ItemPageWidget from '../../Widget/ItemPageWidget';

import useConvertToHtml from '../../hooks/use-convert-to-html';

import theme from './theme.module.css';
import styles from './ItemPage.module.css';

import { Action, Datapoint } from '../datamarts/ItemPage'; // Reuse components from datamarts theme
import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';

const ItemPage = ({ itemData }) => {
  if (!itemData?._id) return null;

  const { desc: description, title, custom_fields = {} } = itemData;
  const {
    access_details,
    access_request_url,
    assets_gtrex,
    assets_vizlib,
    data_contained,
    designed_for,
    initiative_type,
    key_supporters,
    learn_more,
    project_assets,
    project_image,
    report_url,
    topics,
    update_schedule,
    use_cases,
    website_url,
    'givinglab-widget_DATA': givingLabWidgetItems,
    'viz-database-widget_DATA': vizDatabaseWidgetItems,
    'datasets-widget_DATA': datasetsWidgetItems,
  } = custom_fields;
  const htmlDescription = useConvertToHtml(description);

  return (
    <BaseItemPage className={theme.root} data-theme="posterchild">
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.actions}>
        <Action icon="IoIosOpen" label="Project website" url={website_url} />
        <Action
          icon="BsFillFileEarmarkBarGraphFill"
          label="Latest report"
          url={report_url}
        />
        <Action icon="IoLibrarySharp" label="Project assets" url={assets_gtrex} />
        <Action icon="BsDatabaseFill" label="Data access" url={access_request_url} />
      </div>
      <div className={styles.mainContent}>
        {project_image ? <img src={project_image} alt={title} /> : null}
        <div
          className={styles.htmlDescription}
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
        />
      </div>
      <div className={styles.datapoints}>
        <Datapoint label="Initiative Type" data={initiative_type} />
        <Datapoint label="Topic(s)" data={topics.join(', ')} />
        {project_assets && (
          <Datapoint label="Project Assets" data={project_assets.join(', ')} />
        )}
        <Datapoint label="Data Contained" data={data_contained} />
        <Datapoint label="How to Access the Project" data={access_details} />
        <Datapoint label="Update Schedule" data={update_schedule} />
        <Datapoint label="Designed For" data={designed_for} />
        <Datapoint label="Use Case Example" data={use_cases} />
        <Datapoint label="Learn More about this Project" data={learn_more} />
        {key_supporters && (
          <Datapoint
            label="Key Supporters"
            data={key_supporters.map((supporter) => (
              <li>{supporter}</li>
            ))}
          />
        )}
      </div>
      {givingLabWidgetItems?.length > 0 ? (
        <div className={styles.widgetWrapper}>
          <h3 className={styles.widgetTitle}>
            Reports and Publications from this Project
          </h3>
          <ItemPageWidget
            items={givingLabWidgetItems}
            CardComponent={GtrexCard}
            embedUrl="https://www.givingtuesday.org/resource-exchange/library"
            showYear={false}
          />
          <LinkButton newWindow isCentered url={assets_gtrex}>
            <IconLabel icon="IoIosOpen" label="Access all resources from this project" />
          </LinkButton>
        </div>
      ) : null}
      {vizDatabaseWidgetItems?.length > 0 ? (
        <div className={styles.widgetWrapper}>
          <h3 className={styles.widgetTitle}>Visualizations from this this Project</h3>
          <ItemPageWidget
            items={vizDatabaseWidgetItems}
            CardComponent={VizDatabaseCard}
            embedUrl="https://www.givingtuesday.org/visualizations-library"
          />
          <LinkButton newWindow isCentered url={assets_gtrex}>
            <IconLabel
              icon="IoIosOpen"
              label="Access all visualizations from this project"
            />
          </LinkButton>
        </div>
      ) : null}
      {datasetsWidgetItems?.length > 0 ? (
        <div className={styles.widgetWrapper}>
          <h3 className={styles.widgetTitle}>Datasets Associated with this Project</h3>
          <ItemPageWidget
            items={datasetsWidgetItems}
            CardComponent={DatasetsCard}
            embedUrl="https://data.givingtuesday.org/datasets"
          />
        </div>
      ) : null}
    </BaseItemPage>
  );
};

export default ItemPage;
