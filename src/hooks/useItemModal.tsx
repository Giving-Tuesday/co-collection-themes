import { useState, useCallback, type ComponentType } from 'react';
import type { Item } from '../types';
import Modal from '../Modal';

export const useItemModal = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const openItem = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const closeItem = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const ItemModal = ({ ItemPage }: { ItemPage: ComponentType<{ item: Item }> }) => {
    return (
      <Modal
        open={!!selectedItem}
        onOpenChange={closeItem}
        title={selectedItem?.title || 'Item title unavailable'}
        description={selectedItem?.desc || 'Item description unavailable'}
      >
        {selectedItem ? <ItemPage item={selectedItem} /> : 'Error loading item page'}
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
