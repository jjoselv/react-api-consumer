import * as React from 'react';
import styles from './Modal.module.scss';
import Times from '../Icons/Times/Times';
import ReactModal from 'react-modal';

type ModalProps = {
  isOpen: boolean;
  contentLabel?: string;
  onRequestClose(event: React.MouseEvent<HTMLButtonElement>): void;
  children: React.ReactNode;
};

function Modal({
  isOpen,
  contentLabel = 'Example modal',
  onRequestClose,
  children = null
}: ModalProps) {
  return (
    <ReactModal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldFocusAfterRender
      className={styles['modal']}
      overlayClassName={styles['overlay']}
      contentLabel={contentLabel}>
        <button
          className={styles['close-modal-button']}
          type="button"
          onClick={onRequestClose}>
          <Times width={20} height={20}/>
        </button>
        {children}
    </ReactModal>
  );
}

export default Modal;
