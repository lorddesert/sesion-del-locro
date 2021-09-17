import getRandomNumber from './getRandomNumber'
import scrollBottom from './scrollBottom'
import 'firebase/auth'

const sendChatRoomMsg = async (diceRoll = false) => {
   try {
    const sender = auth.currentUser.displayName;
    const receiver = state.receiver; // will be the chatRoom we pick.
    const msg = document.getElementById("chatInput");
    /* I need to change this to the actual chatRoom which the one that has the same .name */

    const { min, max } = state.diceValues;

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

        await app
          .database()
          .ref(newRef)
          .child("chat")
          .push()
          .set(newMsg)

        msg.value = "";
        scrollBottom(true);
      }
      });
   } catch (error) {
     console.log(error)
   }
  };

  export default sendChatRoomMsg