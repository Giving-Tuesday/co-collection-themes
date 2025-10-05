import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { TbLockQuestion, TbWorldPin } from 'react-icons/tb';
import { GoBook } from 'react-icons/go';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';

import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';

import styles from './theme.module.css';
import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';
import Widget from '../../Widget';

const SidebarItem = ({ icon, text }) => {
  if (!text) return null;

  return (
    <li className={styles.sidebarItem}>
      <p className={styles.sidebarIcon} aria-hidden="true">
        {icon}
      </p>
      <p className={styles.sidebarText}>{text}</p>
    </li>
  );
};

const ItemPage = ({ itemData }) => {
  if (!itemData?._id) return null;

  const { author, desc: description, resource_url, title, custom_fields = {} } = itemData;
  const {
    access_level,
    access_request,
    dataset_documentation,
    gtdc_project,
    region,
    resource_type,
    subcollection,
    topics,
    year_published,
    viz_url,
    'widget_viz-library_items': widgetVizLibraryItems,
  } = custom_fields;

  const htmlDescription = useConvertToHtml(description);

  return (
    <BaseItemPage
      className={`${styles.themeRoot} ${styles.itemPageWrapper}`}
      data-theme="gtrex"
    >
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebarList}>
            {author?.length > 0 ? (
              <SidebarItem text={author.join(', ')} icon={<FaUserEdit />} />
            ) : null}
            {resource_type ? (
              <SidebarItem text={resource_type} icon={<GoBook />} />
            ) : null}
            {region ? (
              <SidebarItem text={region.join(', ')} icon={<TbWorldPin />} />
            ) : null}
            {year_published ? (
              <SidebarItem text={year_published} icon={<IoCalendarOutline />} />
            ) : null}
            {subcollection?.length > 0 ? (
              <SidebarItem
                text={subcollection.join(', ')}
                icon={<MdOutlineCollectionsBookmark />}
              />
            ) : null}
            {access_level ? (
              <SidebarItem text={access_level} icon={<TbLockQuestion />} />
            ) : null}
          </ul>
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.additionalInfo}>
            {gtdc_project ? (
              <>
                <p className={styles.additionalInfoText}>
                  Associated GivingTuesday Initiative:
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: gtdc_project,
                  }}
                />
              </>
            ) : null}
            {topics ? (
              <>
                <p className={styles.additionalInfoText}>
                  GivingTuesday Research Topic(s):
                </p>
                <p className={styles.additionalInfoText}>{topics.join(', ')}</p>
              </>
            ) : null}
          </div>
          <div
            className={styles.itemDesc}
            dangerouslySetInnerHTML={{ __html: htmlDescription }}
          />
        </div>
      </div>
      <div className={styles.ctaContainer}>
        <LinkButton newWindow isCentered url={resource_url}>
          <IconLabel as="span" icon="External Link" label="Access Resource" />
        </LinkButton>
        <LinkButton newWindow isCentered url={access_request}>
          <IconLabel as="span" icon="External Link" label="Access Dataset" />
        </LinkButton>
        <LinkButton newWindow isCentered url={dataset_documentation}>
          <IconLabel as="span" icon="External Link" label="Access Data Documentation" />
        </LinkButton>
      </div>

      {widgetVizLibraryItems?.length > 0 ? (
        <Widget
          isItemPageWidget
          items={widgetVizLibraryItems}
          widgetTheme="viz-database-beta"
          embedUrl="https://www.givingtuesday.org/visualizations-library"
        />
      ) : null}

      <div className={styles.ctaContainer}>
        <LinkButton newWindow isCentered url={viz_url}>
          <IconLabel
            as="span"
            icon="External Link"
            label="Access Visualizations from this Report"
          />
        </LinkButton>
      </div>
    </BaseItemPage>
  );
};

export default ItemPage;
