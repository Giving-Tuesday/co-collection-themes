import { MdAddComment } from 'react-icons/md';
import BaseItemPage from '../../BaseItemPage';
import useConvertToHtml from '../../hooks/useConvertToHtml';
import theme from './theme.module.css';
import styles from './ItemPage.module.css';
import LinkButton from '../../LinkButton';
import IconLabel from '../../IconLabel';
import type { Item, ItemPageProps } from '../../types';

const SOLUTION_LABEL = 'Suggest a solution for this problem.';
const PROBLEM_LABEL = 'Suggest a problem that this solution can solve.';
const SOLUTION_LINK = 'https://airtable.com/appuaKysIAOxom6CA/pagYRGlw4ML2TsuCG/form';
const PROBLEM_LINK = 'https://airtable.com/appuaKysIAOxom6CA/pag6jGDU9cxYHNNVK/form';
const EMBED_URL = 'https://ai.givingtuesday.org/problems-and-solutions';

const LinkedItemsList = ({
  linkedItems,
  linkedItemsType,
}: {
  linkedItems: Item[];
  linkedItemsType: 'Problem' | 'Solution';
}) =>
  linkedItems.length > 0 ? (
    <ul className={styles.linkedItemsList}>
      {linkedItems.map((item: Item) => (
        <li key={item._id}>
          <a href={`${EMBED_URL}?co-item=${item.slug}&from=widget`}>{item.title}</a>
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.emptyListMessage}>
      No {linkedItemsType.toLowerCase()} items found in the library yet
    </p>
  );

const ItemPage = ({ item }: ItemPageProps) => {
  const { desc: description, resource_url, title, custom_fields = {} } = item;
  const { item_type, goals, linked_items_DATA } = custom_fields;
  const hasLinkedItems = linked_items_DATA?.length > 0;
  const isProblem = item_type === 'Problem';
  const linkedItemsType = isProblem ? 'Solution' : 'Problem';
  const linkedItemsLabel = `${linkedItemsType} in library`;
  const linkedItemsData =
    hasLinkedItems &&
    LinkedItemsList({ linkedItems: linked_items_DATA, linkedItemsType });
  const htmlDescription = useConvertToHtml(description || '');

  return (
    <BaseItemPage className={theme.root} data-theme="problems-solutions">
      <h2 className={styles.title}>
        <span>{item_type}: </span>
        {title}
      </h2>
      {htmlDescription && (
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
        />
      )}
      <div className={styles.sidebar}>
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
      </div>
      <LinkButton
        newWindow
        small
        type="ghost"
        url={isProblem ? PROBLEM_LINK : SOLUTION_LINK}
        className={styles.suggestLink}
      >
        <MdAddComment />
        {isProblem ? PROBLEM_LABEL : SOLUTION_LABEL}
      </LinkButton>
      {resource_url && (
        <LinkButton newWindow isCentered url={resource_url}>
          <IconLabel icon="External Link" label="Access Resource" />
        </LinkButton>
      )}
    </BaseItemPage>
  );
};

export default ItemPage;
