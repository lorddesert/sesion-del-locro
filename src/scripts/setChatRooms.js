const setChatRooms = async () => {
    try {
      const chatRoomRef = this.app.database().ref("chatRooms");
      const snapshot = await chatRoomRef.once("value");
      let chatRooms = [];

      snapshot.forEach((chatRoom) => {
        const newChatRoom = {
          ...chatRoom.val(),
          chat: chatRoom.hasChild("chat")
            ? Object.values(chatRoom.child("chat").val())
            : [],
        };

        chatRooms.push(newChatRoom);
      });

      this.setState({ chatRooms });
    } catch (error) {
      console.log(error);
    }
  };

  export default setChatRooms