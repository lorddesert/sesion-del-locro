import React from 'react';

import './ChatHeader.scss';
import arrow from './resources/arrow.svg';
import altImg from './resources/altuser.png';

function toggleClass () {
  document.getElementById('main').classList.toggle('show-chat');
}

const ChatHeader = props => {
  return (
    <div className='ChatHeader'>
      <div className='return' id='return' onClick={toggleClass}>
        <img src={arrow} alt='Volver' />
      </div>
      <div>
        <img className='receiver-img' src={props.receiverPhoto ? props.receiverPhoto : altImg} alt='foto del usuario'/>
      </div>
      <div>
        <h2>{props.stateMsg ? props.stateMsg : props.receiverName}</h2>
      </div>
    </div>
  );
}

export default ChatHeader;