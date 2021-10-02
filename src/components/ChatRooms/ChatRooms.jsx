import React from 'react'

import ChatRoom from '../ChatRoom/ChatRoom'

const ChatRooms = props => {
  console.log(props)
    return (
        <>
        {props.chatRooms.length &&
            props.chatRooms.map((chatRoom, i) => (
              <ChatRoom
                key={`chatRoom-${i}`}
                chatRoom={chatRoom}
                setChatRoom={props.setChatRoom}
                number={i}
              />
            ))}
        </>
    )
}

export default ChatRooms
