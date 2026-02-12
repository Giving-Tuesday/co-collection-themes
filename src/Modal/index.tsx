import * as Dialog from '@radix-ui/react-dialog';
import styles from './Modal.module.css';
import { RxCross2 } from 'react-icons/rx';
import type { ReactNode } from 'react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

interface ModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  children: ReactNode;
  title: string;
  description: string;
}

const Modal = ({ open, onOpenChange, children, title, description }: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>
        <VisuallyHidden.Root>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
        </VisuallyHidden.Root>
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

export default Modal;
