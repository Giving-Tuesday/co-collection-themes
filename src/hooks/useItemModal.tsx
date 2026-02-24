import { useState, useCallback, type ReactNode } from 'react';
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

  const ItemModal = ({ children }: { children: ReactNode }) => {
    return (
      <Modal
        open={!!selectedItem}
        onOpenChange={closeItem}
        title={selectedItem?.title || 'Item title unavailable'}
        description={selectedItem?.desc || 'Item description unavailable'}
      >
        {children}
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
