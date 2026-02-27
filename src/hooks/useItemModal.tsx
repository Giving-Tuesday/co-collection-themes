import { useState, useCallback, useMemo, type ReactNode } from 'react';
import type { Item } from '../types';
import Modal from '../Modal';

interface BaseItemModalProps {
  children: ReactNode;
  selectedItem: Item | null;
  onClose: () => void;
}

const BaseItemModal = ({ children, selectedItem, onClose }: BaseItemModalProps) => (
  <Modal
    open={!!selectedItem}
    onOpenChange={onClose}
    title={selectedItem?.title ?? 'Item title unavailable'}
    description={selectedItem?.desc ?? 'Item description unavailable'}
  >
    {children}
  </Modal>
);

export const useItemModal = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const openItem = useCallback((item: Item) => setSelectedItem(item), []);
  const closeItem = useCallback(() => setSelectedItem(null), []);

  const ItemModal = useMemo(() => {
    const Component = ({ children }: { children: ReactNode }) => (
      <BaseItemModal selectedItem={selectedItem} onClose={closeItem}>
        {children}
      </BaseItemModal>
    );
    Component.displayName = 'ItemModal';
    return Component;
  }, [selectedItem, closeItem]);

  return {
    selectedItem,
    openItem,
    closeItem,
    ItemModal,
  };
};
