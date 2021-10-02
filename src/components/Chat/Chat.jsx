import React, { useState, useEffect, useContext } from "react"
import Context from '../../context/GlobalContext'

import Message from "../Message/Message"
import ChatHeader from "../ChatHeader/ChatHeader"
import ChatInput from '../ChatInput/ChatInput'

import "./Chat.scss"
import quote from "./resources/quote.svg"
import dice from "./resources/dice.svg"

const Chat = (props) => {

  let myContext = useContext(Context);
  let setContext = myContext.setGlobalContext
  myContext = myContext.globalContext

  // if('globalContext' in context) context = {...context.globalContext}

  const { inChatRoom, receiver, user } = myContext

  useEffect(() => {
    // console.assert(receiver === {}, ' NOOOOOOOOOOOOOOOO',receiver)
    setContext({...myContext, setChat})
    // console.log('chat receiver: ', receiver)
  }, [])

  const [chatRoom, setChatRoom] = useState({})

  const [chat, setChat] = useState([])

  // useEffect(() => {
  //   if(chat.length) {
  //     setChat(myContext.chat)
  //     console.log(chat)
  //   } else {
  //     console.log(chat)      
  //   }
  // }, [myContext.chat])

  if (chat.length || Object.values(receiver).length !== 0) {
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
            {...{
              receiverPhoto:receiver.photo,
              receiverName:receiver.nickname,
              stateMsg:receiver.stateMsg
              }
            }
            // toggleModal={toggleModal}
            // inChatRoom={inChatRoom}
          />
          <div className="chat-wrapper"></div>
          <div className="Chat-messages" id="chat">
            {
              chat.map((msg, i) => (
                <Message
                  {...{
                    key:`msg-${i}`,
                    userNumber:i,
                    nickname:'receiver.nickname',
                    sender:`${msg.sender}`,
                    content:msg.content,
                    user:user.displayName,
                  }}
                />
              ))
            }
          </div>
          <ChatInput />
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
