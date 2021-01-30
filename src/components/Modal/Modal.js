import React from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';
import PropTypes from 'prop-types';
import Times from '../Icons/Times/Times';

function Modal({isOpen, onRequestClose, contentLabel, children}) {
  return (
    <ReactModal
      appElement={document.getElementById('root')}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldFocusAfterRender
      className="modal"
      overlayClassName="overlay"
      contentLabel={contentLabel}>
      <div className="modal-body">
        <button
          className="close-modal-button"
          type="button"
          onClick={onRequestClose}>
          <Times />
        </button>
        {children}
      </div>
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  contentLabel: 'Example modal',
  children: null,
};

export default Modal;
