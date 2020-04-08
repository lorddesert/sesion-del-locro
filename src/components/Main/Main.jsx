import React from 'react';

import './Main.scss';
import Chat from '../Chat/Chat';
import Contacts from '../Contacts/Contacts';

const Main = () => {
  return (
    <div className='Main'>
      <div className='Main-content'>
        <Contacts />
        <Chat />
      </div>
    </div>
  );
}

export default Main;