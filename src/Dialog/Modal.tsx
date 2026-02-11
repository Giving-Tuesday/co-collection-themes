import * as Dialog from '@radix-ui/react-dialog';
import styles from './Modal.module.css';
import { RxCross2 } from 'react-icons/rx';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({ open, onOpenChange, children, title }: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>
        {title && <Dialog.Title className={styles.Title}>{title}</Dialog.Title>}
        <div className={styles.ScrollArea}>{children}</div>
        <Dialog.Close asChild>
          <button className={styles.IconButton} aria-label="Close">
            <RxCross2 />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
