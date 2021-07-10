const createNewChatRoom = (e) => {
    e.persist();
    e.preventDefault();
    const ref = this.app.database().ref("chatRooms");
    const minDiceValue = document.getElementById("minValue").value;
    const maxDiceValue = document.getElementById("maxValue").value;
    const name = document.getElementById("chatRoomName").value;
    const newChatRoom = {
      // photo,
      chat: [],
      name,
      minDiceValue,
      maxDiceValue,
      stateMsg: "",
    };

    ref
      .once("value")
      .then((snapshot) => {
        if (snapshot.child(`${name}`).exists()) {
          alert("El nombre de la sala no esta disponible.");
          return false;
        } else
          ref
            .child(`${name}`)
            .set(newChatRoom)
            .then(() => {
              this.toggleModal();
            });
      })
      .catch((err) => console.log(err));
  };

  export default createNewChatRoom;