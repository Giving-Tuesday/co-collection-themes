import { useState, useCallback, type ComponentType } from 'react';
import type { Item, ItemPageProps } from '../types';
import Modal from '../Modal';
import LinkButton from '../LinkButton';
import IconLabel from '../IconLabel';

const ModalContent = ({
  selectedItem,
  ItemPage,
  embedUrl,
}: {
  selectedItem: Item | null;
  ItemPage: ComponentType<ItemPageProps>;
  embedUrl: string;
}) => {
  return selectedItem ? (
    <>
      <ItemPage item={selectedItem} inModal={true} />
      <LinkButton isCentered url={`${embedUrl}?co-item=${selectedItem.slug}&from=widget`}>
        <IconLabel icon="IoIosOpen" label="View complete item record" />
      </LinkButton>
    </>
  ) : (
    'Error loading item page'
  );
};

export const useItemModal = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const openItem = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const closeItem = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const ItemModal = ({
    ItemPage,
    embedUrl,
  }: {
    ItemPage: ComponentType<{ item: Item }>;
    embedUrl: string;
  }) => {
    return (
      <Modal
        open={!!selectedItem}
        onOpenChange={closeItem}
        title={selectedItem?.title || 'Item title unavailable'}
        description={selectedItem?.desc || 'Item description unavailable'}
      >
        <ModalContent
          selectedItem={selectedItem}
          ItemPage={ItemPage}
          embedUrl={embedUrl}
        />
      </Modal>
    );
  };

  return {
    selectedItem,
    openItem,
    closeItem,
    ItemModal,
  };
};
