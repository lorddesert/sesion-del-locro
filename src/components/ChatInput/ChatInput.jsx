import { useContext, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { get, getDatabase, ref, child, push, onValue } from 'firebase/database'
import { sendMsg } from '../../scripts/chat'
import './ChatInput.scss'

import sendImg from './resources/send.png'
import dice from './resources/dice.svg'

import Context from '../../context/GlobalContext'

import scrollBottom from '../../scripts/scrollBotom'
import getRandomNumber from '../../scripts/getRandomNumber'


const ChatInput = () => {
  const { globalContext, setGlobalContext } = useContext(Context)
  const { receiver, user, chat, setChat, inChatRoom } = globalContext

  useEffect(() => {
    const receiverUid = receiver.ref.key
    const myUid = getAuth().currentUser.uid

    const myChat = child(ref(getDatabase(), `users/${myUid}`), `contacts/${receiverUid}/chat`)

    const onValueUnsubscribe = onValue(myChat, snapshot => {
      const newMessages = Object.values(snapshot.val())

      //TODO: Make condition to escape the function if there are no new messages.

      console.log("New message entered:", newMessages)

      setGlobalContext({
        ...globalContext,
        chat: newMessages
      })

      setChat(newMessages)
      scrollBottom()
    })

    return () => {
      onValueUnsubscribe()
    }
  }, [])

  return (
    <div className='Chat-input-container'>
      <input
        type='text'
        id='chatInput'
        placeholder='Escribe un mensaje'
        autoFocus
      />
      {inChatRoom
        ? <>
          <div
            onClick={(e) => sendChatRoomMsg(true)}
            className='Input-img'
          >
            <img src={dice} />
          </div>

          <div
            onClick={() => sendChatRoomMsg()}
            className='Input-img'
            id='sendMsg'
          >
            <img src={sendImg} />
          </div>
        </>
        : <>
          <div
            onClick={() => {
              const msg = document.getElementById('chatInput')

              sendMsg({
                receiver,
                msg,
                setGlobalContext,
                setChat,
                globalContext,
                chat
              })
            }}
            className='Input-img'
            id='sendMsg'
          >
            <img src={sendImg} />
          </div>
        </>}

    </div>
  )
}

export default ChatInput
