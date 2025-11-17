import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';

import theme from './theme.module.css';
import styles from './ItemPage.module.css';

import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';

const ItemPage = ({ itemData }) => {
  if (!itemData?._id) return null;

  const { author, desc: description, resource_url, title, custom_fields = {} } = itemData;
  const { region, join_date, countries } = custom_fields;

  const htmlDescription = useConvertToHtml(description);

  return (
    <BaseItemPage
      className={`${theme.root} ${styles.itemPageWrapper}`}
      data-theme="gtrex"
    >
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.additionalInfo}>
            {region ? (
              <p className={styles.additionalInfoText}>Region: {region}</p>
            ) : null}
            {countries ? (
              <p className={styles.additionalInfoText}>
                {region.length > 1 ? 'Countries' : 'Country'}: {countries}
              </p>
            ) : null}
            {join_date ? (
              <p className={styles.additionalInfoText}>Join date: {join_date}</p>
            ) : null}
          </div>
          <div
            className={styles.itemDesc}
            dangerouslySetInnerHTML={{ __html: htmlDescription }}
          />
          <div className={styles.ctaContainer}>
            <LinkButton newWindow isCentered url={resource_url}>
              <IconLabel as="span" icon="External Link" label="Access Resource" />
            </LinkButton>
          </div>
        </div>
      </div>
    </BaseItemPage>
  );
};

export default ItemPage;
