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
    const { nickname } = await receiver.ref.val()

    receiverNickname = nickname

    receiverChat = child(ref(getDatabase(), `users/${receiverUid}`), `contacts/${myUid}/chat`)
    myChat = child(ref(getDatabase(), `users/${myUid}`), `contacts/${receiverUid}/chat`)

    push(myChat, newMsg)
    push(receiverChat, newMsg)

    msg.value = ''

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

    const chatRooms = await get(ref(getDatabase(), 'chatRooms'))

    chatRooms.forEach((chatRoom) => {
      if (chatRoom.val().name === receiver.name) {
        const chatRoomRef = ref(getDatabase(), `chatRooms/${chatRoom.key}/chat`)
        push(chatRoomRef, newMsg)
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