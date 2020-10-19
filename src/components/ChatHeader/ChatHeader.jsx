import React from 'react';

import './ChatHeader.scss';
import arrow from './resources/arrow.svg';
import altImg from './resources/altuser.png';
import moreOptions from './resources/more-options.svg';


function toggleClass () {
  document.getElementById('main').classList.toggle('show-chat');
}

const ChatHeader = props => {
  return (
    <div className='ChatHeader'>
      <div className='return' id='return' onClick={toggleClass}>
        <img src={arrow} alt='Volver' />
      </div>
      <div className='chatHeader-img'>
        <img className='receiver-img' src={props.receiverPhoto ? props.receiverPhoto : altImg} alt='foto del usuario'/>
      </div>
      <div className='chatHeader-headings'>
        <h1>{props.receiverName}</h1>
        {props.stateMsg &&
          <h2>{props.stateMsg}</h2>
        }
      </div>
      <div className='more-options'>
        <img src={moreOptions} alt="mas opciones" onClick={props.toggleModal}/>
      </div>
    </div>
  );
}

export default ChatHeader;