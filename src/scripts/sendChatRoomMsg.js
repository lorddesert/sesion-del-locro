const sendChatRoomMsg = (diceRoll = false) => {
    const sender = this.auth.currentUser.displayName;
    const receiver = this.state.receiver; // will be the chatRoom we pick.
    const msg = document.getElementById("chatInput");
    /* I need to change this to the actual chatRoom which the one that has the same .name */

    const { min, max } = this.state.diceValues;

    let newMsg = {
      sender,
      content: msg.value,
      diceRoll,
    };

    if (msg.value === "" && !diceRoll) return false;
    else if (diceRoll) {
      newMsg.content = this.getRandomNumber(parseInt(min), parseInt(max));
    }

    this.app
      .database()
      .ref("chatRooms")
      .once("value")
      .then((chatRooms) => {
        chatRooms.forEach((chatRoom) => {
          if (chatRoom.child("name").val() === receiver) {
            let newRef = chatRoom.ref;
 
            this.app
              .database()
              .ref(newRef)
              .child("chat")
              .push()
              .set(newMsg)
              .then(() => {
                this.scrollBottom(true);
                msg.value = "";
              })
              .catch((err) => console.log(err));
          }
        });
      });
  };

  export default sendChatRoomMsg