import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { LuGift } from 'react-icons/lu';
import { FaLeaf } from 'react-icons/fa';
import { TbWorldPin } from 'react-icons/tb';

import BaseItemPage from '../../BaseItemPage';
import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';
import useConvertToHtml from '../../hooks/use-convert-to-html';

import theme from './theme.module.css';
import styles from './ItemPage.module.css';

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
              <SidebarItem text={author.join(', ')} icon={<FaUserEdit />} />
            ) : null}
            {location?.length > 0 ? (
              <SidebarItem text={location} icon={<TbWorldPin />} />
            ) : null}
            {gift_type ? (
              <SidebarItem text={gift_type.join(', ')} icon={<LuGift />} />
            ) : null}
            {un_sdg ? <SidebarItem text={un_sdg.join(', ')} icon={<FaLeaf />} /> : null}
          </ul>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />
          {bibliography ? (
            <section>
              <h2 className={styles.h2}>Bibliography</h2>
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
