import scrollBottom from './scrollBottom'
import 'firebase/auth'

const sendMsg = async () => {
  try {
    const msg = document.getElementById("chatInput")
    let myUid = auth.currentUser.uid
    let receiverUsername = null
    let receiverUid = state.receiver.getKey()
    let receiverChat = state.receiver.child(`contacts/${myUid}/chat`)
    let myChat = null
    let newMsg = {}

    if (!msg.value) return false
    
    else
      newMsg = {
        sender: auth.currentUser.displayName,
        content: msg.value,
      }

    //Obtain the receiver username and set my chat.
    const shapshot = await state.receiver.once("value")

    receiverUsername = snapshot.child("displayName").val()
    myChat = state.user.ref.child(`contacts/${receiverUid}/chat`)
    myChat.push().set(newMsg)
    msg.value = ""
    receiverChat.push().set(newMsg)

    scrollBottom(true)
    } catch (error) {      
      toastr.error("Upps, something happened!", "Sending message")
      console.log(err)
    }
  }
  
  export default sendMsg