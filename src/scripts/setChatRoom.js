import setChat from "./setChat";

const setChatRoom = (receiver) => {
    let i = null;

    if (window.innerWidth < 768)
      document.getElementById("main").classList.toggle("show-chat");

    for (i = 0; i < this.state.chatRooms.length; i++)
      if (this.state.chatRooms[i].name === receiver)
        this.setState(
          {
            receiver,
            receiverName: this.state.chatRooms[i].name,
            chat: this.state.chatRooms[i].chat,
            inChatRoom: true,
            stateMsg: this.state.chatRooms[i].stateMsg,
            diceValues: {
              min: this.state.chatRooms[i].minDiceValue,
              max: this.state.chatRooms[i].maxDiceValue,
            },
          },
          this.scrollBottom
        );
  };

export default setChatRoom;