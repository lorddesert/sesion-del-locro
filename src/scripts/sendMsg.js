sendMsg = () => {
    const msg = document.getElementById("chatInput");
    let myUid = this.auth.currentUser.uid;
    let receiverUsername = null;
    let receiverUid = this.state.receiver.getKey();
    let receiverChat = this.state.receiver.child(`contacts/${myUid}/chat`);
    let myChat = null;
    let newMsg = {};

    if (!msg.value) return false;
    else
      newMsg = {
        sender: this.auth.currentUser.displayName,
        content: msg.value,
      };

    //Obtain the receiver username and set my chat.
    this.state.receiver
      .once("value")
      .then((snapshot) => {
        receiverUsername = snapshot.child("displayName").val();
        myChat = this.state.user.ref.child(`contacts/${receiverUid}/chat`);

        myChat.push().set(newMsg);
        msg.value = "";
        receiverChat.push().set(newMsg);
      })
      .then(() => {
        this.scrollBottom(true);
      })
      .catch((err) => {
        toastr.error("Upps, something happened!", "Sending message");
        console.log(err);
      });
  };
  
  export default sendMsg