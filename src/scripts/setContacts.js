  const setContacts = async () => {
    try {
      let contacts = [];
      const usersRef = this.app.database().ref("users");
      const sender = this.auth.currentUser.uid;
      const myNickname = this.auth.currentUser.displayName;

      let snapshot = await usersRef.once("value");

      snapshot.forEach((user) => {
        if (user.val().nickname !== myNickname) {
          const { photo, online, nickname } = user.val();
          let chat = user.child(`contacts/${sender}/chat`).val();

          chat = chat ? Object.values(chat) : [];

          const newContact = {
            chat,
            photo,
            online,
            nickname,
            ref: user,
          };

          contacts.push(newContact);
        }
      });

      this.setState({ contacts });
    } catch (error) {
      console.log(error);
    }
  };

  export default setContacts