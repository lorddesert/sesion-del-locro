import React, { useContext, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { get, getDatabase, ref, child, push, onValue } from 'firebase/database'
import { success } from '../../scripts/customConsole.js' 

import sendImg from "./resources/send.png"
import dice from "./resources/dice.svg"

import Context from '../../context/GlobalContext'

import scrollBottom from '../../scripts/scrollBotom'
import getRandomNumber from '../../scripts/getRandomNumber'



const ChatInput = () => {

  const { globalContext, setGlobalContext } = useContext(Context)
  const { app, auth, receiver, user, chat, setChat, inChatRoom } = globalContext


  // useEffect(() => {
  //   // console.assert(receiver === {}, ' NOOOOOOOOOOOOOOOO',receiver)
  //   window.addEventListener("keyup", handleEvent)
  //   return () => window.removeEventListener("keyup", handleEvent)
  // }, [])

  const sendMsg = async () => {
    try {
      const msg = document.getElementById("chatInput")
      let receiverNickname = null
      let receiverUid = receiver.ref.key
      let receiverChat = null

      let myUid = getAuth().currentUser.uid
      let myChat = null
      let newMsg = {}
      //   console.log('reChat: ', receiverChat)
      //   return

      if (!msg.value) return false

      else
        newMsg = {
          sender: myUid,
          content: msg.value,
          nickname: getAuth().currentUser.displayName
        }
      console.log(getAuth().currentUser);
      //Obtain the receiver username and set my chat.
      const { nickname } = await receiver.ref.val()
      //   return

      receiverNickname = nickname
      // console.log(user, user.ref);
      // console.log('userRef: ', user.userRef);

      receiverChat = child(ref(getDatabase(), `users/${receiverUid}`), `contacts/${myUid}/chat`)
      myChat = child(ref(getDatabase(), `users/${myUid}`), `contacts/${receiverUid}/chat`)


      // myChat.push().set(newMsg)
      push(myChat, newMsg)

      msg.value = ""

      push(receiverChat, newMsg)

      onValue(receiverChat, snapshot => {
        const messages = snapshot.val()
        console.log('receiver: ', Object.values(messages))
      })
      onValue(myChat, snapshot => {
        const messages = snapshot.val()
        console.log('My chat: ', Object.values(messages))
      })

      setGlobalContext({
        ...globalContext,
        chat: [ ...chat, newMsg ]
      })

      setChat([ ...chat, newMsg ])
      scrollBottom(true)
    } catch (error) {
      console.log(error)
    }
  }

  const sendChatRoomMsg = async (diceRoll = false) => {
    try {
      const sender = getAuth().currentUser.uid
      const msg = document.querySelector("#chatInput")

      // console.log(sender, user)

      // return

      const receiverDiceValues = {
        min: receiver.minDiceValue,
        max: receiver.maxDiceValue
      }
      const { min, max } = receiverDiceValues

      let newMsg = {
        sender,
        nickname: user.displayName,
        content: msg.value,
        diceRoll,
      }

      if (msg.value === "" && !diceRoll) return false

      if (diceRoll && typeof diceRoll !== 'object') newMsg.content = getRandomNumber(parseInt(min), parseInt(max))

      // console.log('diceRoll', diceRoll, typeof diceRoll)
      // return

      const chatRooms = await get(ref(getDatabase(), "chatRooms"))

      chatRooms.forEach((chatRoom) => {
        if (chatRoom.val().name === receiver.name) {
          // console.log(newMsg);
          // return
          const chatRoomRef = ref(getDatabase(), `chatRooms/${chatRoom.key}/chat`)
          push(chatRoomRef, newMsg)
          success('Message pushed')
          setChat([ ...chat, newMsg ])

          setGlobalContext({
            ...globalContext,
            chat: [ ...chat, newMsg ]
          })

          msg.value = ""
          scrollBottom(true)
        }

      })
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="Chat-input-container">
    <div className="Chat-input">
      <input
        type="text"
        id="chatInput"
        placeholder="Escribe un mensaje"
        autoFocus
      />
    </div>
    {inChatRoom ?
      <>
        <div className="Input-img-container">
          <div
            onClick={(e) => sendChatRoomMsg(true)}
            className="Input-img"
            onTouchEnd={(e) => sendChatRoomMsg(true)}
          >
            <img src={dice}></img>
          </div>
        </div>

        <div className="Input-img-container">
          <div
            onClick={() => sendChatRoomMsg()}
            className="Input-img"
            onTouchEnd={() => sendChatRoomMsg()}
            id="sendMsg"
          >
            <img src={sendImg}></img>
          </div>
        </div>
      </>
      :
      <>
        <div className="Input-img-container">
          <div
            onClick={sendMsg}
            className="Input-img"
            onTouchEnd={sendMsg}
            id="sendMsg"
          >
            <img src={sendImg}></img>
          </div>
        </div>
      </>
    }

  </div>
}

export default ChatInput