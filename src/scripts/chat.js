import { getAuth } from 'firebase/auth'
import { child, ref, getDatabase, push } from 'firebase/database'
import scrollBottom from "../scripts/scrollBotom"


export async function sendMsg(deps = {
  receiver: {},
  msg: ""
}) {
  const { msg, receiver, setGlobalContext, setChat, globalContext, chat } = deps
  if (!msg.value) return false

  try {
    let receiverNickname = null
    const receiverUid = receiver.ref.key
    let receiverChat = null

    const myUid = getAuth().currentUser.uid
    let myChat = null
    const newMsg = {
      sender: myUid,
      content: msg.value,
      nickname: getAuth().currentUser.displayName
    }
    console.log(getAuth().currentUser)
    // Obtain the receiver username and set my chat.
    const { nickname } = await receiver.ref.val()
    //   return

    receiverNickname = nickname
    // console.log(user, user.ref);
    // console.log('userRef: ', user.userRef);

    receiverChat = child(ref(getDatabase(), `users/${receiverUid}`), `contacts/${myUid}/chat`)
    myChat = child(ref(getDatabase(), `users/${myUid}`), `contacts/${receiverUid}/chat`)

    // myChat.push().set(newMsg)
    push(myChat, newMsg)

    msg.value = ''

    push(receiverChat, newMsg)

    // onValue(receiverChat, snapshot => {
    //   const messages = snapshot.val()
    //   console.log('receiver: ', Object.values(messages))
    // })

    // onValue(myChat, snapshot => {
    //   const newMessages = Object.values(snapshot.val())

    //   console.log("New message entered:", newMessages)

    //   setGlobalContext({
    //     ...globalContext,
    //     chat: newMessages
    //   })

    //   setChat(newMessages)
    // })

    setGlobalContext({
      ...globalContext,
      chat: [...chat, newMsg]
    })

    setChat([...chat, newMsg])
    scrollBottom(true)
  } catch (error) {
    console.log(error)
  }
}


export const sendChatRoomMsg = async (diceRoll = false) => {
  try {
    const sender = getAuth().currentUser.uid
    const msg = document.querySelector('#chatInput')

    // console.log(sender, user)

    // return

    const receiverDiceValues = {
      min: receiver.minDiceValue,
      max: receiver.maxDiceValue
    }
    const { min, max } = receiverDiceValues

    const newMsg = {
      sender,
      nickname: user.displayName,
      content: msg.value,
      diceRoll
    }

    if (msg.value === '' && !diceRoll) return false

    if (diceRoll && typeof diceRoll !== 'object') newMsg.content = getRandomNumber(parseInt(min), parseInt(max))

    // console.log('diceRoll', diceRoll, typeof diceRoll)
    // return

    const chatRooms = await get(ref(getDatabase(), 'chatRooms'))

    chatRooms.forEach((chatRoom) => {
      if (chatRoom.val().name === receiver.name) {
        // console.log(newMsg);
        // return
        const chatRoomRef = ref(getDatabase(), `chatRooms/${chatRoom.key}/chat`)
        push(chatRoomRef, newMsg)
        // success('Message pushed')
        setChat([...chat, newMsg])

        setGlobalContext({
          ...globalContext,
          chat: [...chat, newMsg]
        })

        msg.value = ''
        scrollBottom(true)
      }
    })
  } catch (error) {
    console.log(error)
  }
}