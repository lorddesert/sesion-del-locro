import React, { Component } from "react";
import "./Main.scss";
import { DB_CONFIG } from "../../config/config";
import toastr from "toastr";

/*Components */
import Chat from "../Chat/Chat";
import Contacts from "../Contacts/Contacts";
import Login from "../Login/Login";
import UserConfig from "../userConfig/userConfig";
import firebase from "firebase";
import Register from "../Register/Register";
import CreateCRModal from "../CreateCRModal/CreateCRModal";
import Modal from "../Modal/Modal";

class Main extends Component {
  app = !firebase.apps.length
    ? firebase.initializeApp(DB_CONFIG)
    : firebase.app();
  storage = this.app.storage().ref().child("users");
  auth = this.app.auth();

  state = {
    showLogin: true,
    stepTwo: false,
    showLoginOptions: false,
    showRegister: false,
    showChatRoom: false,
    showCRModal: false,
    inChatRoom: false,
    receiver: null,
    chooseRender: "contacts",
    user: " ",
    chatRooms: [],
    contacts: [],
    chat: [],
  };

  login = async (currentUser = false) => {
    try {
      let ref = null;
      if (currentUser) {
        ref = this.app.database().ref(`users/${this.auth.currentUser.uid}`);

        this.setState(
          {
            showLogin: false,
            showRegister: false,
            user: {
              ref,
            },
          },
          () => {
            this.setContacts();
            this.setChatRooms();
            ref.child("online").onDisconnect().set(false);
          }
        );
      } else {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let { user } = await this.auth.signInWithEmailAndPassword(
          email,
          password
        );
        ref = this.app.database().ref(`users/${user.uid}`);

        this.setState(
          {
            showLogin: false,
            showRegister: false,
            user,
          },
          () => {
            this.setContacts();
            this.setChatRooms();
            ref.child("online").onDisconnect().set(false);
          }
        );
      }
    } catch (error) {
      let err = error;
      switch (error.code) {
        case "auth/invalid-email":
          toastr.error("El email es invalido.");
          break;

        case "auth/user-disabled":
          toastr.error("El email fue eliminado.");
          break;

        case "auth/user-not-found":
          toastr.error("El email no existe.");
          break;

        case "auth/wrong-password":
          toastr.error("Contraseña incorrecta");
          break;

        default:
          console.log(err);
          toastr.error("Un error ocurrio, intente de nuevo mas tarde.");
          break;
      }
    }
  };

  //Necesito conseguir primero el usuario, y luego mandar la actualización.
  beginRegister = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({ user: res.user }, () => {
          this.setStepTwo();
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            alert("La contraeña es muy debil, intente usando otra.");
            break;
          case "auth/email-already-in-use":
            alert("El email ya esta en uso, pruebe con otro.");
            break;
          case "auth/operation-not-allowed":
            alert("Email o contraseña no validos.");
            break;

          default:
            alert("Un error ha ocurrido, intente en unos minutos.");
            console.log(error);
            break;
        }
      });
  };

  //soft slide animation.

  endRegister = async () => {
    try {
      const { uid, email } = this.state.user;
      const nickname = document.getElementById("nickname").value;
      const photo = await this.getRegisterImg(uid);
      let userNewInfo = {};

      if (photo)
        userNewInfo = {
          displayName: nickname,
          photoURL: photo,
        };
      else
        userNewInfo = {
          displayName: nickname,
        };

      await this.state.user.updateProfile(userNewInfo);
      console.log(this.auth.currentUser);
      debugger;
      await this.app.database().ref("users").child(`${uid}`).set({
        nickname: this.auth.currentUser.displayName,
        photo: this.auth.currentUser.photoURL,
        online: true,
        email,
      });

      toastr.success("Registro completado.", "¡Listo!");
      this.login(true);
    } catch (error) {
      console.log(error);
      alert("Ocurrio un error inesperado, intente de nuevo en unos minutos.");
    }
  };

  setStepTwo = () => {
    this.setState((state) => ({
      stepTwo: !state.stepTwo,
    }));
  };

  //optimizing finished.
  setContacts = async () => {
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

  // optimizing done.
  setChatRooms = async () => {
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

  toggleShowRegister = (e) => {
    e.preventDefault();

    this.setState((state) => ({
      ...state,
      showLogin: !state.showLogin,
      showRegister: !state.showRegister,
    }));
  };

  toggleShowLogin = () => {
    this.setState((state) => ({
      ...state,
      showLoginOptions: !state.showLoginOptions,
    }));
  };

  setChat = (receiver, contactRef) => {
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

  setChatRoom = (receiver) => {
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

  storageImg = (e) => {
    const img = document.getElementById("fileInput").files[0];
    const ref = this.app
      .database()
      .ref(`users/${this.state.user.username}/photo`);
    let uploadTask = null;

    e.preventDefault();
    uploadTask = this.storage
      .child(`${this.state.user.username}/${img.name}`)
      .put(img);
    uploadTask.on("state_changed", null, null, () => {
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then((imgURL) => {
          ref.set(imgURL);

          return imgURL;
        })
        .then((imgURL) =>
          this.setState((state) => ({
            ...state,
            user: {
              ...state.user,
              photo: imgURL,
            },
          }))
        )
        .catch((err) => console.log(err));
    });
  };

  async getRegisterImg(uid) {
    try {
      const img = document.getElementById("fileInput").files[0];
      if (!img) {
        return false;
      } else {
        let newUserStorage = this.storage.child(`${uid}/${img.name}`);
        let uploadTask = null;
        let imgURL = null;

        uploadTask = await newUserStorage.put(img);
        imgURL = await newUserStorage.getDownloadURL();

        return imgURL;
      }
    } catch (error) {
      console.log(error);
      console.log(uploadTask, imgURL);
      alert("Ha ocurrido un error inesperado.");
    }
  }

  sendMsg2 = () => {
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

  scrollBottom = (smooth = false) => {
    const chat = document.getElementById("chat");

    if (smooth && typeof smooth === "boolean") {
      chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth",
      });
    } else {
      chat.scrollTo({
        top: chat.scrollHeight,
      });
    }
  };

  saveNewUserInfo = (e) => {
    const newUserName = document.getElementById("newUserName").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const userRef = this.app
      .database()
      .ref(`users/${this.state.user.username}`);
    let newUserInfo = {};

    e.preventDefault();
    userRef
      .once("value")
      .then((snapshot) => {
        newUserInfo = { ...snapshot.val() };
        return newUserInfo;
      })
      .then((newUserInfo) => {
        if (newUserInfo.userName !== newUserName)
          newUserInfo.userName = newUserName;

        if (newPassword !== "")
          if (newPassword === confirmPassword)
            newUserInfo.password = newPassword;
          else {
            alert("¡Las contraseñas deben ser identicas!");
            return false;
          }
        else {
          alert("¡Las contraseñas deben ser identicas!");
          return false;
        }

        return newUserInfo;
      })
      .then((res) => {
        if (res)
          userRef
            .set(res)
            .then(
              () =>
                alert("Guardado correctamente!") /* only CLOSE the editForm */
            )
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  createNewChatRoom = (e) => {
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

  /* it works, now i need to update it.*/
  modifyChatRoom = (e) => {
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

  //We aren't gonna receive nothing - NO!, we receive one thing, wich is
  //Nothing, or a boolean value, if it's true, then send the special message.
  getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max + 1 - min)) + min;

  sendChatRoomMsg = (diceRoll = false) => {
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

  handleInputFocus = (e) => {
    e.persist();
    e.preventDefault();
    e.target.classList.toggle("focusedInput");
  };

  toggleModal = (createChatRoom = false) => {
    if (createChatRoom && typeof createChatRoom === "boolean") {
      this.setState(
        () => ({
          showCRModal: true,
          inChatRoom: false,
          receiver: false,
        }),
        () => {
          document.getElementById("modal").classList.toggle("show-modal");
          setTimeout(
            () =>
              document
                .getElementById("modalForm")
                .classList.toggle("modalTransition"),
            10
          );
        }
      );
    } else {
      this.setState(
        () => ({
          showCRModal: true,
        }),
        () => {
          document.getElementById("modal").classList.toggle("show-modal");
          setTimeout(
            () =>
              document
                .getElementById("modalForm")
                .classList.toggle("modalTransition"),
            10
          );
        }
      );
    }
  };

  componentDidMount = () => {
    const usersRef = this.app.database().ref("users");
    const chatRoomRef = this.app.database().ref("chatRooms");

    usersRef.on("child_changed", (child) => {
      let childUserName = child.child("nickname").val();
      const receiverUid = this.state.receiver.getKey();

      this.state.contacts.forEach((contact) => {
        if (contact.nickname === childUserName) {
          let newContacts = [...this.state.contacts];
          let newChat = [];
          /* find index of the contact, and set the online value to the child changed value */
          newContacts[newContacts.indexOf(contact)].online = child
            .child("online")
            .val();

          this.setState({ contacts: newContacts });
        }
      });

      //If my one of my chat's has changed, find wich and update it.
      if (
        this.state.receiver !== " " &&
        child.child("nickname").val() === this.auth.currentUser.displayName
      ) {
        //indetify the user that we need to change the chat in out state contacts, and set the contacts again.
        const receiverUid = this.state.receiver.getKey();
        let chat = child.child(`contacts/${receiverUid}/chat`).val();
        let newChat = Object.values(chat);

        /*Need to be changed to chante the online state of the user. */
        this.setState({ chat: newChat }, () => {
          setTimeout(() => this.setContacts(), 50);
        });
      }
    });
    //   it doesn't update when I send a new msg.
    //   the msg appears to send correctly, but not update MY chat, and i cannot see the changes.
    chatRoomRef.on("child_changed", (child) => {
      if (this.state.receiver != " ") {
        let chat = child.child("chat").val();

        chat ? (chat = Object.values(chat)) : (chat = []);

        this.setState({ chat }, () => {
          this.setChatRooms();
          setTimeout(() => {
            this.setChatRoom(this.state.receiver);
          }, 50);
        });
      }
    });

    chatRoomRef.on("child_added", () => {
      this.setChatRooms();
    });

    chatRoomRef.on("child_removed", () => {
      this.setChatRooms();
    });
  };

  componentDidUpdate = () => {
    if (this.state.showLogin && this.auth.currentUser)
      this.setState({ showLogin: false }, () => this.login(true));
  };

  componentWillUnmount = () => {
    const ref = this.app.database().ref(`users`);
    ref.off();
  };

  render() {
    toastr.options = {
      positionClass: "toast-bottom-right",
      timeOut: 2000,
      progressBar: true,
      closeButton: true,
      newestOnTop: false,
    };
    if (this.state.showLogin)
      return (
        <div className="Main">
          <div className="Main-content">
            <Login
              toggleShowLogin={this.toggleShowLogin}
              showLoginOptions={this.state.showLoginOptions}
              showRegister={this.state.showRegister}
              authUser={this.authUser}
              user={this.state.user.username}
              toggleShowRegister={this.toggleShowRegister}
              register={this.register}
              login={this.login}
            />
          </div>
        </div>
      );
    else if (this.state.inChatRoom)
      return (
        <div className="Main">
          <div className="Main-content" id="main">
            {this.state.showCRModal && (
              <CreateCRModal
                toggleModal={this.toggleModal}
                handleInputFocus={this.handleInputFocus}
                createNewChatRoom={this.createNewChatRoom}
                modifyChatRoom={this.modifyChatRoom}
                inChatRoom={this.state.inChatRoom}
              />
            )}
            <UserConfig
              user={this.state.user}
              saveNewUserInfo={this.saveNewUserInfo}
              storageImg={this.storageImg}
            />
            {/* It will show the users connected in the chatRoom, EVEN I. */}
            <Contacts
              app={this.app}
              user={this.state.user}
              contacts={this.state.contacts}
              setChat={this.setChat}
              chatRooms={this.state.chatRooms}
              setChatRoom={this.setChatRoom}
              toggleModal={this.toggleModal}
              auth={this.auth}
            />
            <Chat
              user={this.auth.currentUser.displayName}
              sendMsg={this.sendMsg}
              receiver={this.state.receiver}
              chat={this.state.chat}
              sendChatRoomMsg={this.sendChatRoomMsg}
              inChatRoom={this.state.inChatRoom}
              chatRoom={this.state.chatRoom}
              stateMsg={this.state.stateMsg}
              receiverName={this.state.receiverName}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
      );
    else if (this.state.showRegister)
      return (
        <div className="Main">
          <div className="Main-content">
            <Register
              stepTwo={this.state.stepTwo}
              setStepTwo={this.setStepTwo}
              beginRegister={this.beginRegister}
              endRegister={this.endRegister}
              toggleShowRegister={this.toggleShowRegister}
              handleInputFocus={this.handleInputFocus}
              storageImg={this.storageImg}
              beginRegister={this.beginRegister}
              user={this.state.user}
            />
          </div>
        </div>
      );
    else
      return (
        <div className="Main">
          <div className="Main-content" id="main">
            <Modal closeModal={this.toggleModal} />
            {this.state.showCRModal && (
              <CreateCRModal
                toggleModal={this.toggleModal}
                handleInputFocus={this.handleInputFocus}
                createNewChatRoom={this.createNewChatRoom}
                modifyChatRoom={this.modifyChatRoom}
                inChatRoom={this.state.inChatRoom}
              />
            )}
            <UserConfig
              user={this.state.user}
              saveNewUserInfo={this.saveNewUserInfo}
              storageImg={this.storageImg}
            />
            <Contacts
              app={this.app}
              user={this.state.user}
              contacts={this.state.contacts}
              setChat={this.setChat}
              enterChatRooms={this.enterChatRooms}
              chooseRender={this.state.chooseRender}
              chatRooms={this.state.chatRooms}
              setChatRoom={this.setChatRoom}
              toggleModal={this.toggleModal}
              auth={this.auth}
            />
            <Chat
              user={this.state.user.nickname}
              sendMsg={this.sendMsg}
              receiver={this.state.receiver}
              chat={this.state.chat}
              sendChatRoomMsg={this.sendChatRoomMsg}
              inChatRoom={this.state.inChatRoom}
              sendMsg2={this.sendMsg2}
              receiverPhoto={this.state.receiverPhoto}
              receiverName={this.state.receiverName}
              receiverNickname={this.state.receiverNickname}
            />
          </div>
        </div>
      );
  }
}

export default Main;
