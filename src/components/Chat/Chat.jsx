import React, { useState, useEffect, useContext } from "react"
import GlobalContext from '../../context/GlobalContext'

import Message from "../Message/Message"
import ChatHeader from "../ChatHeader/ChatHeader"

import "./Chat.scss"
import sendImg from "./resources/send.png"
import quote from "./resources/quote.svg"
import dice from "./resources/dice.svg"

const Chat = (props) => {

  const { inChatRoom, receiver } = useContext(GlobalContext)

  // useEffect(() => {
  //   if(inChatRoom || receiver.nickname) {
  //     window.addEventListener("keyup", handleEvent)
  //     console.log('Event listener subscribed!')
  //   }
  //   // return () => window.removeEventListener("keyup", handleEvent)
  // }, [])

  const [chatRoom, setChatRoom] = useState({})

  const [chat, setChat] = useState([])

  const handleEvent = (e) => {
      if (e.key === "Enter") 
        if(receiver.nickname)  {
          console.log('send message!')
          // props.sendMsg2()
        }
        else {
          console.log('send message to chat room!')
          // props.sendChatRoomMsg()
        }
    }


  //     /* 
  //               receiverPhoto={props.receiverPhoto}
  //             receiverName={props.receiverName}
  //             stateMsg={props.stateMsg}
  //             toggleModal={props.toggleModal}
  //             inChatRoom={props.inChatRoom}

  // const { receiverPhoto, receiverName, }
  // if chatRoom { stateMsg }

  // user.inChatRoom
  
  // function toggleModal
  
  // */

  // // const [inChatRoom, setInChatRoom] = useState(false)


  if (receiver) {
    if(inChatRoom) {
       return (
        <div className="Chat">
          <div className="Chat-content" id="chatContent">
            <ChatHeader
              // receiverPhoto={receiver.photo}
              // receiverName={receiver.name}
              // stateMsg={chatRoom.stateMsg}
              receiverPhoto={'receiver.photo'}
              receiverName={'receiver.name'}
              stateMsg={'chatRoom.stateMsg'}
              // toggleModal={props.toggleModal}
              inChatRoom={inChatRoom}
            />
            <div className="chat-wrapper"></div>
            <div className="Chat-messages" id="chat">
              {chat.map((msg, i) => (
                <Message
                  key={`msg-${i}`}
                  user={props.user || {}}
                  userNumber={i}
                  sender={`${msg.sender}`}
                  content={msg.content}
                  diceRoll={msg.diceRoll}
                />
              ))
              }
            </div>
            <div className="Chat-input-container">
              <div className="Chat-input">
                <input
                  type="text"
                  id="chatInput"
                  placeholder="Escribe un mensaje"
                  autoFocus
                />
              </div>
              <div className="Input-img-container">
                <div
                  // onClick={() => props.sendChatRoomMsg(true)}
                  className="Input-img"
                  // onTouchEnd={() => props.sendChatRoomMsg(true)}
                >
                  <img src={dice}></img>
                </div>
              </div>
              <div className="Input-img-container">
                <div
                  // onClick={() => props.sendChatRoomMsg()}
                  className="Input-img"
                  // onTouchEnd={() => props.sendChatRoomMsg()}
                  id="sendMsg"
                >
                  <img src={sendImg}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="Chat">
        <div className="Chat-content" id="chatContent">
          <ChatHeader
            receiverPhoto={'receiver.photo'}
            receiverName={'receiver.name'}
            stateMsg={'stateMsg'}
            // toggleModal={toggleModal}
            // inChatRoom={inChatRoom}
          />
          <div className="chat-wrapper"></div>
          <div className="Chat-messages" id="chat">
            {
              props.chat.map((msg, i) => (
                <Message
                  key={`msg-${i}`}
                  user={props.user || {}}
                  userNumber={i}
                  nickname={'receiver.nickname'}
                  sender={`${msg.sender}`}
                  content={msg.content}
                />
              ))
            }
          </div>
          <div className="Chat-input-container">
            <div className="Chat-input">
              <input
                type="text"
                id="chatInput"
                placeholder="Escribe un mensaje"
                autoFocus
              />
            </div>
            <div className="Input-img-container">
              <div
                // onClick={() => props.sendMsg2()}
                className="Input-img"
                // onTouchEnd={() => props.sendMsg2()}
                id="sendMsg"
              >
                <img src={sendImg}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  // Fallback background.
  } else {
    return (
      <div className="Chat" id="chat">
        <div className="Chat-content">
          <div className="intro">
            <hgroup>
              <h2>¡Bienvenido!</h2>
              <h3>¿Listo para otra gran aventura?</h3>
            </hgroup>
            <div className="quotes">
              <p>
                Si no, puedes tomar este consejo de nuestros autoproclamados
                expertos:
              </p>
              <blockquote>
                <img src={quote} alt="quatation marks" />
                <p>
                  El que me crea que me crea el que no me crea que no me crea.{" "}
                  <strong className="autor">- Desconocido</strong>
                </p>
                <img
                  src={quote}
                  style={{ transform: "rotate(180deg)" }}
                  alt="quatation marks"
                />
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
