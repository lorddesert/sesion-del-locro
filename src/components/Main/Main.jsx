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
      let authCurrentUser = this.auth.currentUser;

      if (currentUser) {
        ref = this.app.database().ref(`users/${this.auth.currentUser.uid}`);

        toastr.success("Sesion abierta detectada");

        console.log(this.auth.currentUser)

        this.setState(
          {
            showLogin: false,
            showRegister: false,
            user: {
              ref,
              ...authCurrentUser,
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
  beginRegister = async () => {
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const displayName = document.querySelector("#nickname").value;

        const user = await this.auth.createUserWithEmailAndPassword(email, password);
        await this.auth.currentUser.updateProfile({displayName})

        await this.app.database().ref("users").child(`${this.auth.currentUser.uid}`).set({
          nickname: this.auth.currentUser.displayName,
          photo: this.auth.currentUser.photoURL,
          online: true,
          email,
        });
  
        toastr.success("Registro completado.", "¡Listo!");
        
        this.setState({ user }, () => {
          // this.setStepTwo();
          this.login();
        })

      }
      catch(error) {
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
      }
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

  componentDidMount = () => {
    const usersRef = this.app.database().ref("users");
    const chatRoomRef = this.app.database().ref("chatRooms");

    usersRef.on("child_changed", (child) => {
      let childUserName = child.child("nickname").val();
      console.log(childUserName)
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
        // debugger;
        const receiverUid = this.state.receiver.getKey();
        let chat = child.child(`contacts/${receiverUid}/chat`).val();
        console.log(child.child(`contacts/`).val(), receiverUid)
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
              receiver={this.state.receiver}
              chat={this.state.chat}
              sendChatRoomMsg={this.sendChatRoomMsg}
              inChatRoom={this.state.inChatRoom}
              // chatRoom={this.state.chatRoom}
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
              user={this.auth.currentUser.displayName}
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