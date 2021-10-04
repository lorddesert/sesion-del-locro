import React, { useContext } from 'react';
import './ChatRoom.scss';
import chatRoomImg from './resources/chat-room.svg';
import scrollBottom from '../../scripts/scrollBotom'
import Context from '../../context/GlobalContext'



const ChatRoom = props => {
  const { globalContext, setGlobalContext } = useContext(Context)
  const { setChat, inChatRoom } = globalContext

  const setChatRoom = async () => {
    try {
      if (window.innerWidth < 768)
        document.getElementById("main").classList.toggle("show-chat");

      setGlobalContext({
        ...globalContext,
        inChatRoom: true,
        chat: [ ...props.chatRoom.chat ],
        receiver: {
          ...props.chatRoom
        }
      })
      await setChat([ ...props.chatRoom.chat ])
      scrollBottom()

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="ChatRoom" onClick={setChatRoom}>
      <div className="ChatRoom-image">
        {props.chatRoom.photo ?
          <img
            id={`ChatRoom-${props.number}`}
            src={props.chatRoom.photo}
            alt='ChatRoom image'
          />
          :
          <div className='alternative-img'>
            <img
              id={`ChatRoom-${props.number}`}
              src={chatRoomImg} alt={props.chatRoom.name}
              style={{ background: '#e3e3e3' }}
            />
          </div>
        }
      </div>
      <div className="ChatRoom-name">
        <span>{props.chatRoom.name}</span>
      </div>
    </div>
  );

}

export default ChatRoom;