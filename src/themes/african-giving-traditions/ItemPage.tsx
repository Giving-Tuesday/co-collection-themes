import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { LuGift } from 'react-icons/lu';
import { FaLeaf } from 'react-icons/fa';
import { TbWorldPin } from 'react-icons/tb';

import BaseItemPage from '../../BaseItemPage';
import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';
import useConvertToHtml from '../../hooks/use-convert-to-html';

// @ts-expect-error TS(2307): Cannot find module './theme.module.css' or its cor... Remove this comment to see the full error message
import theme from './theme.module.css';
// @ts-expect-error TS(2307): Cannot find module './ItemPage.module.css' or its ... Remove this comment to see the full error message
import styles from './ItemPage.module.css';

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
  const { bibliography, location, gift_type, un_sdg } = custom_fields;

  const htmlDescription = useConvertToHtml(description);
  const htmlBibliography = useConvertToHtml(bibliography);

  return (
    <BaseItemPage
      className={`${theme.root} ${styles.itemPageWrapper}`}
      data-theme="african-giving-traditions"
    >
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebarList}>
            {author?.length > 0 ? (
              // @ts-expect-error TS(2786): 'FaUserEdit' cannot be used as a JSX component.
              <SidebarItem text={author.join(', ')} icon={<FaUserEdit />} />
            ) : null}
            {location?.length > 0 ? (
              // @ts-expect-error TS(2786): 'TbWorldPin' cannot be used as a JSX component.
              <SidebarItem text={location} icon={<TbWorldPin />} />
            ) : null}
            {gift_type ? (
              // @ts-expect-error TS(2786): 'LuGift' cannot be used as a JSX component.
              <SidebarItem text={gift_type.join(', ')} icon={<LuGift />} />
            ) : null}
            // @ts-expect-error TS(2786): 'FaLeaf' cannot be used as a JSX component.
            {un_sdg ? <SidebarItem text={un_sdg.join(', ')} icon={<FaLeaf />} /> : null}
          </ul>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | Tr... Remove this comment to see the full error message
          <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />
          {bibliography ? (
            <section>
              <h2 className={styles.h2}>Bibliography</h2>
              // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | Tr... Remove this comment to see the full error message
              <div dangerouslySetInnerHTML={{ __html: htmlBibliography }} />
            </section>
          ) : null}
        </div>
      </div>
      <LinkButton
        newWindow
        isCentered
        {...{
          bg: '#0fb5c3',
          color: '#fff',
          url: resource_url,
        }}
      >
        <IconLabel as="span" icon="External Link" label="View Resource" />
      </LinkButton>
    </BaseItemPage>
  );
};

export default ItemPage;
