import firebase from 'firebase/app'
import toggleModal from './toggleModal'

const app = firebase.app()

const modifyChatRoom = (e) => {
  try {
    e.persist()
    e.preventDefault()

    let chatRoomRef = null
    const newChatRoomName = document.getElementById("chatRoomName").value
    const newChatRoomStateMessage = document.getElementById("chatRoomState")
      .value
      
    const diceValues = {
      min: document.getElementById("minValue").value,
      max: document.getElementById("maxValue").value,
    }

      const chatRooms = await app.database().ref("chatRooms").once("value")

      chatRooms.forEach((chatRoom) => {
        if (chatRoom.child("name").val() === state.receiver)
          chatRoomRef = chatRoom.ref
      })

      if ( newChatRoomName === "" && diceValues.min === "" && diceValues.max === "" && newChatRoomStateMessage === "" )
        return false

      else if (diceValues.min === "" || diceValues.max === "") 
        return false

      else {
        const chatRoom = chatRoomRef.once("value")

        let newChatRoom = chatRoom.val()

            if (diceValues.min != "")
              newChatRoom.maxDiceValue = diceValues.min

            else 
              newChatRoom.minDiceValue = state.diceValues.min

            if (diceValues.max != "")
              newChatRoom.maxDiceValue = diceValues.max

            else 
              newChatRoom.maxDiceValue = state.diceValues.max

            if (newChatRoomName != "") {
              newChatRoom.name = newChatRoomName
              console.log(newChatRoomName)
            } else {
              newChatRoom.name = state.receiver
            } 

            if (newChatRoomStateMessage != "")
              newChatRoom.stateMsg = newChatRoomStateMessage

            else 
              newChatRoom.stateMsg = state.stateMsg

            chatRoomRef.set(newChatRoom)
            toggleModal()

          this.setState({ receiver: newChatRoomName })
      }
    } catch (error) {
      console.log(error)
    }
  }

  export default modifyChatRoom