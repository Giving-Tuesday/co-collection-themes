import React from 'react';

import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';
import { findIcon, findIconByLabel } from '../../settings/ICON_LIST';

// @ts-expect-error TS(2307): Cannot find module './theme.module.css' or its cor... Remove this comment to see the full error message
import theme from './theme.module.css';
// @ts-expect-error TS(2307): Cannot find module './ItemPage.module.css' or its ... Remove this comment to see the full error message
import styles from './ItemPage.module.css';
import { convertFileSize } from '../../utils/text.utils';

export const Action = ({
  icon,
  label,
  url
}: any) => {
  const Icon = icon ? findIcon(icon) : findIconByLabel(label);

  return url ? (
    <a className={styles.action} href={url} target="_blank">
      <span className={styles.iconContainer}>
        // @ts-expect-error TS(2604): JSX element type 'Icon' does not have any construc... Remove this comment to see the full error message
        <Icon />
      </span>
      <span className={styles.actionLabel}>{label}</span>
    </a>
  ) : null;
};

export const Datapoint = ({
  label,
  data
}: any) =>
  data ? (
    <div className={styles.datapoint}>
      <h3 className={styles.datapointLabel}>{label}</h3>
      <p className={styles.data}>{data}</p>
    </div>
  ) : null;

const ItemPage = ({
  itemData
}: any) => {
  if (!itemData?._id) return null;

  const { desc: description, title, custom_fields = {} } = itemData;
  const {
    category,
    dataset_documentation,
    download_url,
    form_type,
    last_updated,
    part,
    size,
  } = custom_fields;

  const htmlDescription = useConvertToHtml(description);

  return (
    <BaseItemPage className={theme.root} data-theme="datamarts">
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.actions}>
        <Action
          icon="CgFileDocument"
          label="View Data Documentation"
          url={dataset_documentation}
        />
        <Action icon="BsDatabaseFillDown" label="Download Data" url={download_url} />
      </div>
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | Tr... Remove this comment to see the full error message
      <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />
      <div className={styles.datapoints}>
        <Datapoint label="Form Type" data={form_type} />
        <Datapoint label="Part(s)" data={part?.join(', ')} />
        <Datapoint label="Category" data={category?.join(', ')} />
        <Datapoint label="Size" data={convertFileSize(size)} />
        <Datapoint label="Last Updated" data={last_updated} />
      </div>
    </BaseItemPage>
  );
};

export default ItemPage;
