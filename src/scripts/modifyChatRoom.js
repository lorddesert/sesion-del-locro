const modifyChatRoom = (e) => {
    e.persist();
    e.preventDefault();
    let chatRoomRef = null;
    const newChatRoomName = document.getElementById("chatRoomName").value;
    const newChatRoomStateMessage = document.getElementById("chatRoomState")
      .value;
    const diceValues = {
      min: document.getElementById("minValue").value,
      max: document.getElementById("maxValue").value,
    };

    this.app
      .database()
      .ref("chatRooms")
      .once("value")
      .then((chatRooms) =>
        chatRooms.forEach((chatRoom) => {
          if (chatRoom.child("name").val() === this.state.receiver)
            chatRoomRef = chatRoom.ref;
        })
      )
      .then(() => {
        if (
          newChatRoomName === "" &&
          diceValues.min === "" &&
          diceValues.max === "" &&
          newChatRoomStateMessage === ""
        )
          return false;
        else if (diceValues.min === "" || diceValues.max === "") return false;
        else {
          chatRoomRef
            .once("value")
            .then((chatRoom) => {
              let newChatRoom = chatRoom.val();

              if (diceValues.min != "")
                newChatRoom.maxDiceValue = diceValues.min;
              else newChatRoom.minDiceValue = this.state.diceValues.min;

              if (diceValues.max != "")
                newChatRoom.maxDiceValue = diceValues.max;
              else newChatRoom.maxDiceValue = this.state.diceValues.max;

              if (newChatRoomName != "") {
                newChatRoom.name = newChatRoomName;
                console.log(newChatRoomName);
              } else newChatRoom.name = this.state.receiver;

              if (newChatRoomStateMessage != "")
                newChatRoom.stateMsg = newChatRoomStateMessage;
              else newChatRoom.stateMsg = this.state.stateMsg;

              chatRoomRef.set(newChatRoom);
              this.toggleModal();
            })
            .then(() => this.setState({ receiver: newChatRoomName }))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  export default modifyChatRoom;