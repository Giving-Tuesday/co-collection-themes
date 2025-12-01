import React from 'react';
import { MdAddComment } from 'react-icons/md';

import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/use-convert-to-html';

import theme from './theme.module.css';
import styles from './ItemPage.module.css';
import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';

const SOLUTION_LABEL = 'Suggest a solution for this problem.';
const PROBLEM_LABEL = 'Suggest a problem that this solution can solve.';
const SOLUTION_LINK = 'https://airtable.com/appuaKysIAOxom6CA/pagYRGlw4ML2TsuCG/form';
const PROBLEM_LINK = 'https://airtable.com/appuaKysIAOxom6CA/pag6jGDU9cxYHNNVK/form';

// TODO: FIX the routing problem for linked items as a fast-follow
// need to accommodate all apps that use this theme, similar to how Card.jsx does it

const LinkedItemsList = ({ linkedItems, linkedItemsType, location }) =>
  linkedItems.length > 0 ? (
    <ul className={styles.linkedItemsList}>
      {linkedItems.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  ) : (
    <p className={styles.emptyListMessage}>
      No {linkedItemsType.toLowerCase()} items found in the library yet
    </p>
  );

const ItemPage = ({ itemData }) => {
  if (!itemData?._id) return null;

  const { desc: description, resource_url, title, custom_fields = {} } = itemData;
  const { item_type, goals, linked_items_DATA } = custom_fields;
  const hasLinkedItems = linked_items_DATA?.length > 0;
  const isProblem = item_type === 'Problem';
  const linkedItemsType = isProblem ? 'Solution' : 'Problem';
  const linkedItemsLabel = `${linkedItemsType} in library`;
  const linkedItemsData =
    hasLinkedItems &&
    LinkedItemsList({ linkedItems: linked_items_DATA, linkedItemsType, location });

  const htmlDescription = useConvertToHtml(description);

  return (
    <BaseItemPage className={theme.root} data-theme="problems-solutions">
      <h2 className={styles.title}>
        <span>{item_type}: </span>
        {title}
      </h2>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: htmlDescription }}
      />
      <div className={styles.datapoints}>
        {goals ? (
          <div className={styles.datapoint}>
            <h3 className={styles.datapointLabel}>Goals</h3>
            <p className={styles.datapointValue}>{goals.join(', ')}</p>
          </div>
        ) : null}
        {hasLinkedItems ? (
          <div className={styles.datapoint}>
            <h3 className={styles.datapointLabel}>{linkedItemsLabel}</h3>
            <div className={styles.datapointValue}>{linkedItemsData}</div>
          </div>
        ) : null}
        <div className={styles.datapoint}>
          <h3 className={styles.datapointLabel}></h3>
          <div className={styles.datapointValue}>
            <a
              className={styles.suggestLink}
              href={isProblem ? PROBLEM_LINK : SOLUTION_LINK}
              target="_blank"
            >
              <MdAddComment />
              {isProblem ? PROBLEM_LABEL : SOLUTION_LABEL}
            </a>
          </div>
        </div>
      </div>
      <LinkButton isCentered url={resource_url}>
        <IconLabel icon="External Link" label="Access Resource" />
      </LinkButton>
    </BaseItemPage>
  );
};

export default ItemPage;
