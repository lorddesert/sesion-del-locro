import React, { useContext } from 'react';
import './ChatRoom.scss';
import chatRoomImg from './resources/chat-room.svg';
import scrollBottom from '../../scripts/scrollBotom'
import Context from '../../context/GlobalContext'



const ChatRoom = props => {

  console.log(props)
  
const { globalContext, setGlobalContext } = useContext(Context)
const { setChat, inChatRoom } = globalContext

  const setChatRoom = () => {
    // console.log(props.chatRoom.name)
    console.log('ininChatRoom', inChatRoom)


    if (window.innerWidth < 768)
      document.getElementById("main").classList.toggle("show-chat");

    // for (i = 0; i < this.state.chatRooms.length; i++)
    //   if (this.state.chatRooms[i].name === receiver)
        setGlobalContext({
          ...globalContext,
          inChatRoom: true,
          chat: [...props.chatRoom.chat],
          receiver: {
            ...props.chatRoom
          }
        })
        setChat([...props.chatRoom.chat])

        setTimeout(() => console.log(globalContext), 1000)

    //     this.setState(
    //       {
    //         receiver,
    //         receiverName: chatRoom.name,
    //         chat: this.state.chatRooms[i].chat,
    //         inChatRoom: true,
    //         stateMsg: this.state.chatRooms[i].stateMsg,
    //         diceValues: {
    //           min: this.state.chatRooms[i].minDiceValue,
    //           max: this.state.chatRooms[i].maxDiceValue,
    //         },
    //       },
    //       scrollBottom()
    //     );
    
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
                style={{background: '#e3e3e3'}}
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