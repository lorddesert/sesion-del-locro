const setChat = (receiver, contactRef) => {
    let i = null;
    let receiverPhoto = null;
    let receiverName = null;

    if (window.innerWidth < 768) {
      document.getElementById("main").classList.toggle("show-chat");
    }

    contactRef.ref
      .once("value")
      .then((snapshot) => {
        receiverPhoto = snapshot.child("photo").val();
        receiverName = snapshot.child("nickname").val();
      })
      .then(() => {
        for (i = 0; i < this.state.contacts.length; i++)
          if (this.state.contacts[i].nickname === receiver)
            this.setState(
              {
                receiver: contactRef.ref,
                receiverPhoto,
                receiverName,
                receiverNickname: this.state.contacts[i].nickname,
                chat: this.state.contacts[i].chat,
                inChatRoom: false,
              },
              this.scrollBottom
            );
      })
      .catch((err) => console.log(err));
  };

  export default setChat;