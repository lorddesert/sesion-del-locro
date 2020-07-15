import React from 'react';

import './ChatHeader.scss';
import arrow from './resources/arrow.svg';

function toggleClass () {
  document.getElementById('main').classList.toggle('show-chat');
}

const ChatHeader = () => {
  return (
    <div className='ChatHeader'>
      <div className='return' id='return' onClick={toggleClass}>
        <img src={arrow} alt='Volver' />
      </div>
      <div className='receiver-img'>
      </div>
    </div>
  );
}

export default ChatHeader;