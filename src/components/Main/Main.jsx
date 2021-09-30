import React, { useState, useContext } from "react";
import "./Main.scss";
import Context from '../../context/GlobalContext'
import toastr from "toastr"; // ? Should we use this?

/*Components */
import Chat from "../Chat/Chat";
import Contacts from "../Contacts/Contacts";
import Login from "../Login/Login";
import UserConfig from "../userConfig/userConfig";
import Register from "../Register/Register";
import CreateCRModal from "../CreateCRModal/CreateCRModal";

const Main = () => {
  const { auth, app, inChatRoom } = useContext(Context)

  const [state, setState] = useState({
    // State of Main to handle the view
    showLogin: true,
    stepTwo: false,
    showLoginOptions: false,
    showRegister: false,
    showChatRoom: false,
    showCRModal: false,
    chooseRender: "contacts",
    
    // Maybe
    // receiver: null,
    // inChatRoom: false,    
    // This is only needed for Contacts
    chatRooms: [],
    contacts: [],


    // Only for chat?
    chat: [],
  })

  const [showLogin, setShowLogin] = useState(true)

  const [stepTwo, setStepTwo] = useState(false)

  const [showLoginOptions, setShowLoginOptions] = useState(false)

  const [showRegister, setShowRegister] = useState(false)
  
  const [showChatRoom, setShowChatRoom] = useState(false)

  const [showCRModal, setShowCRModal] = useState(false)

  const [chooseRender, setChooseRender] = useState("contacts")

  const [user, setUser] = useState({
    username: '',
    displayName: '',
    photoURL: '',
  })
  
  // stepTwo: false,
  // showLoginOptions: false,
  // showRegister: false,
  // showChatRoom: false,
  // showCRModal: false,
  // chooseRender: "contacts",

  const login = async (currentUser = false) => {
    try {
      
      let ref = null;
      let authCurrentUser = auth.currentUser;

      if (currentUser) {
        ref = app.database().ref(`users/${auth.currentUser.uid}`);

        toastr.success("Sesion abierta detectada");

        console.log(auth.currentUser)
        
        ref.child("online").onDisconnect().set(false);

        setUser({ ref, ...authCurrentUser })
        setShowLogin(false)
        setShowRegister(false)

      } else {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let { user } = await auth.signInWithEmailAndPassword(
          email,
          password
        );
        ref = app.database().ref(`users/${user.uid}`);

        setUser(user)
        setShowLogin(false)
        setShowRegister(false)
        /* 
          setUser
        */
        // setState(
        //   {
        //     showLogin: false,
        //     showRegister: false,
        //     user,
        //   },
        //   () => {
        //     setContacts();
        //     setChatRooms();
        //     ref.child("online").onDisconnect().set(false);
        //   }
        // );
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

  // useEffect(() => {
  //   setState(
  //     {
  //       showLogin: false,
  //       showRegister: false,
  //       user: {
  //         ref,
  //         ...authCurrentUser,
  //       },
  //     },
  //     () => {
  //       setContacts();
  //       setChatRooms();
  //       ref.child("online").onDisconnect().set(false);
  //     }
  //   );
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  //Necesito conseguir primero el usuario, y luego mandar la actualización.
  // const beginRegister = async () => {
  //   try {
  //     const email = document.getElementById("email").value;
  //     const password = document.getElementById("password").value;
  //     const displayName = document.querySelector("#nickname").value;

  //     const user = await this.auth.createUserWithEmailAndPassword(email, password);
  //     await this.auth.currentUser.updateProfile({ displayName })

  //     await this.app.database().ref("users").child(`${this.auth.currentUser.uid}`).set({
  //       nickname: this.auth.currentUser.displayName,
  //       photo: this.auth.currentUser.photoURL,
  //       online: true,
  //       email,
  //     });

  //     toastr.success("Registro completado.", "¡Listo!");

  //     this.setState({ user }, () => {
  //       // this.setStepTwo();
  //       this.login();
  //     })

  //   }
  //   catch (error) {
  //     switch (error.code) {
  //       case "auth/weak-password":
  //         alert("La contraeña es muy debil, intente usando otra.");
  //         break;
  //       case "auth/email-already-in-use":
  //         alert("El email ya esta en uso, pruebe con otro.");
  //         break;
  //       case "auth/operation-not-allowed":
  //         alert("Email o contraseña no validos.");
  //         break;

  //       default:
  //         alert("Un error ha ocurrido, intente en unos minutos.");
  //         console.log(error);
  //         break;
  //     }
  //   }
  // };

  // //soft slide animation.

  // const endRegister = async () => {
  //   try {
  //     const { uid, email } = this.state.user;
  //     const nickname = document.getElementById("nickname").value;
  //     const photo = await this.getRegisterImg(uid);
  //     let userNewInfo = {};

  //     if (photo)
  //       userNewInfo = {
  //         displayName: nickname,
  //         photoURL: photo,
  //       };
  //     else
  //       userNewInfo = {
  //         displayName: nickname,
  //       };

  //     await this.state.user.updateProfile(userNewInfo);
  //     console.log(this.auth.currentUser);
  //     debugger;
  //     await this.app.database().ref("users").child(`${uid}`).set({
  //       nickname: this.auth.currentUser.displayName,
  //       photo: this.auth.currentUser.photoURL,
  //       online: true,
  //       email,
  //     });

  //     toastr.success("Registro completado.", "¡Listo!");
  //     this.login(true);
  //   } catch (error) {
  //     console.log(error);
  //     alert("Ocurrio un error inesperado, intente de nuevo en unos minutos.");
  //   }
  // };

  // const setStepTwo = () => {
  //   this.setState((state) => ({
  //     stepTwo: !state.stepTwo,
  //   }));
  // };

  const toggleShowRegister = (e) => {
    e.preventDefault();

    this.setState((state) => ({
      ...state,
      showLogin: !state.showLogin,
      showRegister: !state.showRegister,
    }));
  };

  const toggleShowLogin = () => {
    this.setState((state) => ({
      ...state,
      showLoginOptions: !state.showLoginOptions,
    }));
  };


  // ! All the effect will be in Different components
  // // useEffect(() => {
  // //   const usersRef = globalContext.app.database().ref("users");

  //   // const chatRoomRef = globalContext.app.database().ref("chatRooms");

  //   // usersRef.on("child_changed", (child) => {
  //   //   let childUserName = child.child("nickname").val()
  //   //   const receiverUid = state.receiver.getKey()
  //   // }

    
  // !    /* This logic will go in Contacts component, I think */
  //     // this.state.contacts.forEach((contact) => {
  //     //   if (contact.nickname === childUserName) {
  //     //     let newContacts = [ ...state.contacts ];
  //     //     let newChat = [];
  //     //     /* find index of the contact, and set the online value to the child changed value */
  //     //     newContacts[ newContacts.indexOf(contact) ].online = child
  //     //       .child("online")
  //     //       .val();

  //     //     this.setState({ contacts: newContacts });
  //     //   }
  //     // });


  //!     // This will be in Contacts component too.
  //     //If my one of my chat's has changed, find wich and update it.
  //   //   if (
  //   //     this.state.receiver !== " " &&
  //   //     child.child("nickname").val() === this.auth.currentUser.displayName
  //   //   ) {
  //   //     //indetify the user that we need to change the chat in out state contacts, and set the contacts again.
  //   //     // debugger;
  //   //     const receiverUid = this.state.receiver.getKey();
  //   //     let chat = child.child(`contacts/${receiverUid}/chat`).val();
  //   //     console.log(child.child(`contacts/`).val(), receiverUid)
  //   //     let newChat = Object.values(chat);

  //   //     /*Need to be changed to chante the online state of the user. */
  //   //     this.setState({ chat: newChat }, () => {
  //   //       setTimeout(() => this.setContacts(), 50);
  //   //     });
  //   //   }
  //   // });


  //!   // This will be in Chat component
  //   // //   it doesn't update when I send a new msg.
  //   // //   the msg appears to send correctly, but not update MY chat, and i cannot see the changes.
  //   // chatRoomRef.on("child_changed", (child) => {
  //   //   if (this.state.receiver != " ") {
  //   //     let chat = child.child("chat").val();

  //   //     chat ? (chat = Object.values(chat)) : (chat = []);

  //   //     this.setState({ chat }, () => {
  //   //       this.setChatRooms();
  //   //       setTimeout(() => {
  //   //         this.setChatRoom(this.state.receiver);
  //   //       }, 50);
  //   //     });
  //   //   }
  //   // });

  //!   // This will be in ChatRoom/Chat component
  //   // chatRoomRef.on("child_added", () => {
  //   //   this.setChatRooms();
  //   // });

  //   // chatRoomRef.on("child_removed", () => {
  //   //   this.setChatRooms();
  //   // });



  // //   return () => {
  // //     const ref = globalContext.app.database().ref('users');
  // //     ref.off();
  // //   }
    
  // // }, [])


  // /* Supuesto auto login */
  // // const componentDidUpdate = () => {
  // //   if (this.state.showLogin && this.auth.currentUser)
  // //     this.setState({ showLogin: false }, () => this.login(true));
  // // };

  toastr.options = {
    positionClass: "toast-bottom-right",
    timeOut: 2000,
    progressBar: true,
    closeButton: true,
    newestOnTop: false,
  };

  //* Login
  if (showLogin)
    return (
      <div className="Main">
        <div className="Main-content">
          <Login
            {...{
              setShowLogin,
              showLoginOptions,
              setShowRegister,
              toggleShowRegister,
            }}
            
            // authUser={authUser}
            // register={register}
          />
        </div>
      </div>
    );

    //* ChatRoom
  else if (inChatRoom)
    return (
      <div className="Main">
        <div className="Main-content" id="main">
          {state.showCRModal && (
            <CreateCRModal
            {...{
              toggleModal,
              handleInputFocus,
              createNewChatRoom,
              modifyChatRoom,
              inChatRoom,
            }}

            />
          )}
          <UserConfig
            // saveNewUserInfo={saveNewUserInfo}
            // storageImg={storageImg}
          />
          {/* It will show the users connected in the chatRoom, EVEN I. */}
          <Contacts
            // setChat={setChat}
            // setChatRoom={setChatRoom}
            // toggleModal={toggleModal}
          />
          <Chat
            user={auth.currentUser.displayName}
            receiver={{}} // * Custom hook
            sendChatRoomMsg={sendChatRoomMsg}
            inChatRoom={false}
            stateMsg={false}
            receiverName={false}
            // chatRoom={state.chatRoom}
            // toggleModal={toggleModal}
          />
        </div>
      </div>
    );

    //* Register
  else if (state.showRegister)
    return (
      <div className="Main">
        <div className="Main-content">
          <Register
            {...{
              stepTwo,
              setStepTwo,
              beginRegister,
              endRegister,
              toggleShowRegister,
              handleInputFocus,
              storageImg,
              beginRegister,
            }}
          />
        </div>
      </div>
    );
  else {
    return (
      <div className="Main">
        <div className="Main-content" id="main">
          {state.showCRModal && (
            <CreateCRModal
              // toggleModal={toggleModal}
              // handleInputFocus={handleInputFocus}
              // createNewChatRoom={createNewChatRoom}
              // modifyChatRoom={modifyChatRoom}
              // inChatRoom={state.inChatRoom}
            />
          )}
          <UserConfig
            // saveNewUserInfo={saveNewUserInfo}
            // storageImg={storageImg}
          />
          <Contacts
            // contacts={state.contacts}
            // setChat={setChat}
            // enterChatRooms={enterChatRooms}
            // chooseRender={state.chooseRender}
            // chatRooms={state.chatRooms}
            // setChatRoom={setChatRoom}
            // toggleModal={toggleModal}
          />
          <Chat
            // user={auth.currentUser.displayName}
            // sendMsg={sendMsg}
            // receiver={state.receiver}
            // chat={state.chat}
            // sendChatRoomMsg={sendChatRoomMsg}
            // inChatRoom={state.inChatRoom}
            // sendMsg2={sendMsg2}
            // receiverPhoto={state.receiverPhoto}
            // receiverName={state.receiverName}
            // receiverNickname={state.receiverNickname}
          />
        </div>
      </div>
    );
  }

}

export default Main