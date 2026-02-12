import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';
import { findIcon, findIconByLabel } from '../../settings/ICON_LIST';
import theme from './theme.module.css';
import styles from './ItemPage.module.css';
import { convertFileSize } from '../../utils/text.utils';
import type { ItemPageProps } from '../../types';

export const Action = ({
  icon,
  label,
  url,
}: {
  icon: string;
  label: string;
  url: string;
}) => {
  const Icon = icon ? findIcon(icon) : findIconByLabel(label);
  return url ? (
    <a className={styles.action} href={url} target="_blank">
      <span className={styles.iconContainer}>{Icon && <Icon />}</span>
      <span className={styles.actionLabel}>{label}</span>
    </a>
  ) : null;
};

export const Datapoint = ({ label, data }: { label: string; data: string }) => {
  return data ? (
    <div className={styles.datapoint}>
      <h3 className={styles.datapointLabel}>{label}</h3>
      <p className={styles.data}>
        {data.startsWith('<') ? (
          <span dangerouslySetInnerHTML={{ __html: data }} />
        ) : (
          data
        )}
      </p>
    </div>
  ) : null;
};

const ItemPage = ({ item }: ItemPageProps) => {
  if (!item?._id) return null;

  const { desc: description, title, custom_fields } = item;
  const {
    category,
    dataset_documentation,
    download_url,
    form_type,
    last_updated,
    part,
    size,
  } = custom_fields;

  const htmlDescription = useConvertToHtml(description || '');

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
      {htmlDescription && <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />}
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
