import { useState, useCallback } from 'react';
import type { Item } from '../types';
import Modal from '../Modal';
import { WidgetModal } from '../Widget/WidgetModal';

export const useItemModal = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const openItem = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const closeItem = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const ItemModal = ({ embedUrl }: { embedUrl: string }) => {
    return (
      <Modal
        open={!!selectedItem}
        onOpenChange={closeItem}
        title={selectedItem?.title || 'Item title unavailable'}
        description={selectedItem?.desc || 'Item description unavailable'}
      >
        <WidgetModal selectedItem={selectedItem} embedUrl={embedUrl} />
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
