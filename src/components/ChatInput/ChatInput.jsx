import React, { useContext, useEffect } from 'react'

import sendImg from "./resources/send.png"
import dice from "./resources/dice.svg"

import Context from '../../context/GlobalContext'

import scrollBottom from '../../scripts/scrollBotom'
import getRandomNumber from '../../scripts/getRandomNumber'



const ChatInput = () => {

  const { globalContext, setGlobalContext } = useContext(Context)
  const { app, auth, receiver, user, chat, setChat, inChatRoom } = globalContext


  useEffect(() => {
    // console.assert(receiver === {}, ' NOOOOOOOOOOOOOOOO',receiver)
    window.addEventListener("keyup", handleEvent)
    return () => window.removeEventListener("keyup", handleEvent)
  }, [])

  const handleEvent = (e) => {
    if (e.key === "Enter")
      if (receiver.nickname) {
        // console.log('send message!')
        document.querySelector("#sendMsg").click()
      }
  }


  const sendMsg = async () => {
    try {
      const msg = document.getElementById("chatInput")
      let myUid = auth.currentUser.uid
      let receiverNickname = null
      let receiverUid = receiver.ref.key
      let receiverChat = receiver.ref.child(`contacts/${myUid}/chat`).ref
      let myChat = null
      let newMsg = {}
      //   console.log('reChat: ', receiverChat)
      //   return

      if (!msg.value) return false

      else
        newMsg = {
          sender: auth.currentUser.displayName,
          content: msg.value,
        }

      //Obtain the receiver username and set my chat.
      const { nickname } = await receiver.ref.val()
      //   return

      receiverNickname = nickname
      myChat = user.ref.child(`contacts/${receiverUid}/chat`)
      myChat.push().set(newMsg)
      msg.value = ""
      receiverChat.push().set(newMsg)
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
      const sender = auth.currentUser.displayName;
      const receiver = receiver.name; // will be the chatRoom we pick.
      const msg = document.getElementById("chatInput");
      /* I need to change this to the actual chatRoom which the one that has the same .name */
      const receiverDiceValues = {
        min: receiver.minDiceValue,
        max: receiver.maxDiceValue
      }
      const { min, max } = receiverDiceValues;

      let newMsg = {
        sender,
        content: msg.value,
        diceRoll,
      };

      if (msg.value === "" && !diceRoll) return false;
      else if (diceRoll) {
        newMsg.content = getRandomNumber(parseInt(min), parseInt(max));
      }

      const chatRooms = app.database().ref("chatRooms").once("value")

      chatRooms.forEach((chatRoom) => {
        if (chatRoom.child("name").val() === receiver) {
          let newRef = chatRoom.ref;
          app.database().ref(newRef).child("chat").push().set(newMsg)
          msg.value = "";
          scrollBottom(true);
        }

      });
    } catch (error) {
      console.log(error)
    }
  };

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
            onClick={() => sendChatRoomMsg(true)}
            className="Input-img"
            onTouchEnd={() => sendChatRoomMsg(true)}
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