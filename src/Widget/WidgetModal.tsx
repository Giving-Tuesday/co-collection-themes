import useConvertToHtml from '../hooks/use-convert-to-html';
import type { Item } from '../types';
import styles from './WidgetModal.module.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const WidgetModal = ({
  selectedItem,
  embedUrl,
}: {
  selectedItem: Item | null;
  embedUrl?: string | undefined;
}) => {
  const htmlDescription = useConvertToHtml(selectedItem?.desc || '');
  return selectedItem ? (
    <div className={styles.content}>
      <h2 className={styles.title}>{selectedItem.title}</h2>
      {htmlDescription && <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />}
      {embedUrl && (
        <p className={styles.footnote}>
          To learn more about this resource,{' '}
          <a
            className={styles.link}
            href={`${embedUrl}?co-item=${selectedItem.slug}&from=widget`}
          >
            visit our library <FaExternalLinkAlt size={'0.75rem'} />
          </a>
        </p>
      )}
    </div>
  ) : (
    'Error loading item'
  );
};
