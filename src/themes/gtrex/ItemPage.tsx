import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { TbLockQuestion, TbWorldPin } from 'react-icons/tb';
import { GoBook } from 'react-icons/go';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';

import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';

// @ts-expect-error TS(2307): Cannot find module './theme.module.css' or its cor... Remove this comment to see the full error message
import theme from './theme.module.css';
// @ts-expect-error TS(2307): Cannot find module './ItemPage.module.css' or its ... Remove this comment to see the full error message
import styles from './ItemPage.module.css';

import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';
import ItemPageWidget from '../../Widget/ItemPageWidget';
import { Card as VizDatabaseCard } from '../viz-database';

const SidebarItem = ({
  icon,
  text
}: any) => {
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

const ItemPage = ({
  itemData
}: any) => {
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
    'widget_viz-library_DATA': widgetVizLibraryItems,
  } = custom_fields;

  const htmlDescription = useConvertToHtml(description);

  return (
    <BaseItemPage
      className={`${theme.root} ${styles.itemPageWrapper}`}
      data-theme="gtrex"
    >
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebarList}>
            {author?.length > 0 ? (
              // @ts-expect-error TS(2786): 'FaUserEdit' cannot be used as a JSX component.
              <SidebarItem text={author.join(', ')} icon={<FaUserEdit />} />
            ) : null}
            {resource_type ? (
              // @ts-expect-error TS(2786): 'GoBook' cannot be used as a JSX component.
              <SidebarItem text={resource_type} icon={<GoBook />} />
            ) : null}
            {region ? (
              // @ts-expect-error TS(2786): 'TbWorldPin' cannot be used as a JSX component.
              <SidebarItem text={region.join(', ')} icon={<TbWorldPin />} />
            ) : null}
            {year_published ? (
              // @ts-expect-error TS(2786): 'IoCalendarOutline' cannot be used as a JSX compon... Remove this comment to see the full error message
              <SidebarItem text={year_published} icon={<IoCalendarOutline />} />
            ) : null}
            {subcollection?.length > 0 ? (
              <SidebarItem
                text={subcollection.join(', ')}
                // @ts-expect-error TS(2786): 'MdOutlineCollectionsBookmark' cannot be used as a... Remove this comment to see the full error message
                icon={<MdOutlineCollectionsBookmark />}
              />
            ) : null}
            {access_level ? (
              // @ts-expect-error TS(2786): 'TbLockQuestion' cannot be used as a JSX component... Remove this comment to see the full error message
              <SidebarItem text={access_level} icon={<TbLockQuestion />} />
            ) : null}
          </ul>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
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
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | Tr... Remove this comment to see the full error message
            dangerouslySetInnerHTML={{ __html: htmlDescription }}
          />
          <div className={styles.ctaContainer}>
            <LinkButton newWindow isCentered url={resource_url}>
              <IconLabel as="span" icon="External Link" label="Access Resource" />
            </LinkButton>
            <LinkButton newWindow isCentered url={access_request}>
              <IconLabel as="span" icon="External Link" label="Access Dataset" />
            </LinkButton>
            <LinkButton newWindow isCentered url={dataset_documentation}>
              <IconLabel
                as="span"
                icon="External Link"
                label="Access Data Documentation"
              />
            </LinkButton>
          </div>
        </div>
      </div>

      {widgetVizLibraryItems?.length > 0 ? (
        <ItemPageWidget
          isItemPageWidget
          items={widgetVizLibraryItems}
          CardComponent={VizDatabaseCard}
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
