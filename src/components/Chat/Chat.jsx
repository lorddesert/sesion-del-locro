import React, { useState, useEffect, useContext } from "react"
import Context from '../../context/GlobalContext'
import { getAuth } from 'firebase/auth'

import Message from "../Message/Message"
import ChatHeader from "../ChatHeader/ChatHeader"
import ChatInput from '../ChatInput/ChatInput'

import "./Chat.scss"
import quote from "./resources/quote.svg"

const Chat = (props) => {

  let myContext = useContext(Context);
  let setContext = myContext.setGlobalContext
  myContext = myContext.globalContext

  // if('globalContext' in context) context = {...context.globalContext}

  const { inChatRoom, receiver, user } = myContext

  useEffect(() => {
    setContext({ ...myContext, setChat })
    // console.log('chat receiver: ', receiver)
  }, [])

  // useEffect(() => {
  //   console.log('Receiver in main: ', receiver)
  // }, [ receiver ])

  const [ chatRoom, setChatRoom ] = useState({})

  const [ chat, setChat ] = useState([])

  // useEffect(() => {
  //   if(chat.length) {
  //     setChat(myContext.chat)
  //     console.log(chat)
  //   } else {
  //     console.log(chat)      
  //   }
  // }, [myContext.chat])
  const handleEvent = (e) => {
    e.persist()
    if (e.key === "Enter") {
      document.querySelector("#sendMsg").click()
    }
    // console.log('send message!')
  }


  if (chat.length) {
    return (
      <div className="Chat" onKeyPress={handleEvent}>
        <div className="Chat-content" id="chatContent">
          {!inChatRoom ?
            <ChatHeader
              {...{
                receiverPhoto: receiver.photo,
                receiverName: receiver.nickname,
                stateMsg: receiver.stateMsg
              }
              }
            // toggleModal={toggleModal}
            // inChatRoom={inChatRoom}
            />
            :
            <ChatHeader
              {...{
                receiverPhoto: receiver.photo,
                receiverName: receiver.name,
                stateMsg: receiver.stateMsg
              }
              }
            // toggleModal={toggleModal}
            // inChatRoom={inChatRoom}
            />}
          {/* <div className="chat-wrapper"></div> */}
          <div className="Chat-messages" id="chat">
            {inChatRoom ?
              chat.map((msg, i) => (
                <Message
                  {...{
                    key: `msg-${i}`,
                    user: getAuth().currentUser.uid, //actual UID
                    sender: msg.sender, //message sender UID
                    userNumber: i,
                    content: msg.content,
                    nickname: msg.nickname,
                    diceRoll: msg.diceRoll
                  }
                  }
                />
              ))
              :
              chat.map((msg, i) => (
                <Message
                  {...{
                    key: `msg-${i}`,
                    user: getAuth().currentUser.uid, //actual UID
                    sender: msg.sender, //message sender UID
                    userNumber: i,
                    content: msg.content,
                    nickname: msg.nickname,
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
            Intro
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
