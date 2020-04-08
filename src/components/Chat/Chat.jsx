import React from 'react';
import './Chat.scss';

const Chat = () => {
  return (
    <div className='Chat'>
      <div className='Chat-content'>
        <div className='Chat-messages'>
          <div className="MSG">
            <span>
              asdasdasd
            </span>
          </div>
          <div className="MSG">
            <span>
              asdasdasd
            </span>
          </div>
          <div className="MSG">
            <span>
              asdasdasd
            </span>
          </div>
        </div>
        <div className='Chat-input'>
          <input type='text' placeholder='Write a msg'/>
          <button className='Chat-inputBtn'>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;