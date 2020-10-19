import React from 'react';

import './Modal.scss';



const Modal = props => {
  return (
    <div className="Modal" id='modal' >
      <div className="Modal-content" onClick={props.toggleModal}>
      </div>
      <form id='modalForm'>
        {props.children}
      </form>
    </div>
  );
}

export default Modal;