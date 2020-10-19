import React, { Component } from 'react';
import './Main.scss';
import { DB_CONFIG } from '../../config/config';

/*Components */
import Chat from '../Chat/Chat';
import Contacts from '../Contacts/Contacts';
import Login from '../Login/Login';
import UserConfig from '../userConfig/userConfig';
import firebase from 'firebase';
import Register from '../Register/Register';
import CreateCRModal from '../CreateCRModal/CreateCRModal';


class Main extends Component {
  app = !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();
  storage = this.app.storage().ref().child('users');

  state = {
    showLogin: true,
    showLoginOptions: false,
    showRegister: false,
    showChatRoom: false,
    showCRModal: false,
    chooseRender: 'contacts',
    chatRooms : [],
    contacts: [],
    chat: [],
    user: ' ',
    receiver: null,
    inChatRoom: false
  }

  authUser = e => {
    e.preventDefault();

    const ref = this.app.database().ref().child('users');
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('errorMsg');

    if(userName == '' || password == '')
      return false;

    ref.once('value')
    .then(snapshot => {
      /* This will be changed for a loop over all the users */
      /* Need to find the username IN the users, no the ID */
      const user = snapshot.hasChild(`${userName}`);
      /*
      User is the input username.

      snapshot.forEach(user => {
        const username = user.child('username').val();
        const password = user.child('password').val();
        if(username === inputUsername)  {
          if(password === inputPassword) {
            msg.style.color = 'green';
            msg.innerHTML = 'Usuario encontrado.';
            setTimeout(() => this.login(userName), 600);
          } else {
            error msg
          }

        } else {
          error msg
        }
      })
      */

       if(user) {
        const authPassword = snapshot.child(`${userName}/password`).val();
        const res = authPassword == `${password}` ? true : false;

        if(res) {
          msg.style.color = 'green';
          msg.innerHTML = 'Usuario encontrado.';
          setTimeout(() => this.login(userName), 600);
        }
        else {
          msg.innerHTML = 'Password incorrecto.';
        }
      }
      else {
        msg.innerHTML = 'Usuario no encontrado.';
      }
    })
    .catch(err => console.log(err));
  }

  login = userName => {
    const ref = this.app.database().ref(`users/${userName}`);

    ref.child('online').set(true);

    ref.once('value')
    .then(snapshot => {
      const photo = snapshot.child('photo').val();

      this.setState(state => ({
        ...state,
        showLogin: false,
        user: {
          nickname : snapshot.child('nickname').val(),
          userName,
          photo,
          ref
        }
      }))
    })

    this.setContacts();
    this.setChatRooms();
    ref.child('online').onDisconnect().set(false);
  }

  register = e => {
    const userName = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    const nickname = document.getElementById('nickname').value;
    const msg = document.getElementById('errorMsg');
    const ref = this.app.database().ref('users');
    e.preventDefault();

    if(userName == '' || password == '')
      return false;

// Filter if whe find a object parsed.
    if(!(isNaN(parseInt(password)))) {
      password = parseInt(password);
    }

    ref.once('value')
      .then(snapshot => {
        const auth = snapshot.hasChild(`${userName}`);

        if(auth) {
          msg.style.color = 'red';
          msg.innerHTML = 'Nombre de usuario no disponible.';
        } else {
          const newUser = {
            userName,
            nickname,
            contacts: [],
            online: false,
            password,
            photo: false,
          }

          ref.child(`${userName}`).set(newUser)
            .then(() => {
              msg.style.color = 'green';
              msg.innerHTML = 'Registro completado.';
              setTimeout(() => location.reload(), 600)
            })
            .catch(err => console.log(err));
        }
      })
  }

  setContacts = () => {
    // const ref = this.app.database().ref(`users/${user}/contacts`);
    const usersRef = this.app.database().ref('users');

    usersRef.once('value')
    .then(snapshot => {
      let contacts = [];
      const sender = this.state.user.userName;

      snapshot.forEach(user => {
        // filter me, and verify only who is online.
        if(user.val().userName != this.state.user.userName) {
          const { userName, photo, online, nickname } = user.val();
          let chat = user.child(`contacts/${sender}/chat`).val();

          chat = chat ? Object.values(chat) : [];

          const newContact = {
            userName,
            chat,
            photo,
            online,
            nickname,
            ref: user
          }

          contacts.push(newContact);
        }});
        return contacts;
      })
      .then(contacts => this.setState({contacts}))
      .catch(err => console.log(err));
  }

  setChatRooms = () => {
    const chatRoomRef = this.app.database().ref('chatRooms');

    chatRoomRef.once('value')
    .then(snapshot => {
      let chatRooms = [];

      snapshot.forEach(chatRoom => {
        const newChatRoom = {
          ...chatRoom.val(),
          chat: chatRoom.hasChild('chat') ? Object.values(chatRoom.child('chat').val()) : []
        }

        chatRooms.push(newChatRoom);
      })
        return chatRooms;
      })
      .then(chatRooms => this.setState({chatRooms}))
      .catch(err => console.log(err));

  }

  toggleShowRegister = e => {
    e.preventDefault();

    this.setState(state => ({
      ...state,
      showLogin: !state.showLogin,
      showRegister: !state.showRegister
    }));
  }

  toggleShowLogin = () => {
    this.setState(state => ({
      ...state,
      showLoginOptions: !state.showLoginOptions
    }));
  }

  setMessages = (user, child, users) => {
  /* Remove, in contacts, I will not appear. */
    if(!(child.val() == `${user}`)) {
      const chat = Object.values(child.val());
      const user = {
        userName: child.child('userName').val(),
        chat
      }

      users.push(user);
    }
  }

  setChat = (receiver, contactRef) => {
    let i = null;
    let receiverPhoto = null;
    let receiverName = null;

    if(window.innerWidth < 768) {
      // chat.style.display = 'block';
      // contacts.style.display = 'none';
      document.getElementById('main').classList.toggle('show-chat');
    }

    contactRef.ref.once('value')
    .then(snapshot => {
      receiverPhoto = snapshot.child('photo').val();
      receiverName = snapshot.child('userName').val();
    })
    .then(() => {
      for(i = 0; i < this.state.contacts.length; i++)
      if(this.state.contacts[i].userName === receiver)
        this.setState({
          receiver: contactRef.ref,
          receiverPhoto,
          receiverName,
          receiverNickname: this.state.contacts[i].nickname,
          chat: this.state.contacts[i].chat,
          inChatRoom: false
        }, this.scrollBottom)
    })
    .catch(err => console.log(err))

    
  }

  setChatRoom = receiver => {
    let i = null;

    if(window.innerWidth < 768)
      document.getElementById('main').classList.toggle('show-chat');

    // if(window.innerWidth < 768) {
    //   chat.style.display = 'block';
    //   contacts.style.display = 'none';
    // }
    /*
    if I am in the chatRoom i clicked => setState -> chat: chat of chatRoom(where do I get this?).
    */
    // this.setState({receiver, chat: this.state.})
    for(i = 0; i < this.state.chatRooms.length; i++)
      if(this.state.chatRooms[i].name === receiver)
        this.setState({
          receiver,
          receiverName: this.state.chatRooms[i].name,
          chat: this.state.chatRooms[i].chat,
          inChatRoom: true,
          stateMsg: this.state.chatRooms[i].stateMsg,
          diceValues: {
            min: this.state.chatRooms[i].minDiceValue,
            max: this.state.chatRooms[i].maxDiceValue
          }
        });
  }

  storageImg = e => {
    const img = document.getElementById('fileInput').files[0];
    const ref = this.app.database().ref(`users/${this.state.user.userName}/photo`);
    let uploadTask = null;

    e.preventDefault();
    uploadTask = this.storage.child(`${this.state.user.userName}/${img.name}`).put(img);
    uploadTask.on('state_changed',
    null,
    null,
    () => {
      // .then(res => console.log(res))
      uploadTask.snapshot.ref.getDownloadURL()
      .then(imgURL => {
        ref.set(imgURL)

        return imgURL;
      })
      .then(imgURL => this.setState(state => ({
        ...state,
        user: {
          ...state.user,
          photo: imgURL
        }
      })))
      .catch(err => console.log(err))
    })
  }

  setUserChat = messages => {
    // let onlineUsers = this.state.onlineUsers;
    const onlineUsers = [...this.state.onlineUsers];
    const l = onlineUsers.length;
    for(let i = 0; i < l; i++) {
    // Finding the user that we are talking to...
      if(messages[0].sender == onlineUsers[i].userName) {
        onlineUsers[i].chat = messages;
        this.setState({onlineUsers});
      }
    }
  }

  sendMsg = () => {
    const sender = this.state.user.userName; //This will be the nickname
    const receiver = this.state.receiver;
    const msg = document.getElementById('chatInput');
    const senderChat = this.app.database().ref(`users/${sender}/contacts/${receiver}/chat`);
    const receiverChat = this.app.database().ref(`users/${receiver}/contacts/${sender}/chat`);

    const newMsg = {
      sender,
      content: msg.value,
    }

    if(msg.value === '')
      return false;

    senderChat.push().set(newMsg)
    .then(() => {
      this.scrollBottom();
      msg.value = '';
    })
    .then(() => receiverChat.push().set(newMsg))
    .catch(err => console.log(err));
  }

  sendMsg2 = () => {
    /*



 // First we receive the ref of the contact,
    // Second we create a new ref pointing to the contact ref,
    // Choose the new info and set it in the ref we create.
    // This will work...?

    const ref = this.app.database().ref(contactRef.ref);
    const newContact = {
      ...contactRef.val(),
    }

    console.log(contactRef.ref);
    ref.set(newContact);

*/

// receiver = reference, the refence of the contact
      // console.log(receiver.path.pieces_[1]); // this will return the contact ID

      // This is sending the MSG to -> lorddesert/contacts/chat/lorddesert <- i need to change this to the receiver
      // Now YES!

      // 1) Send msg to my chat.
      // 2) Send msg to the receiver chat.

      // this.state.receiver.once('value')
      // .then(res => console.log(res.val()));
      const msg = document.getElementById('chatInput');
      let myUsername = this.state.user.userName;
      let receiverUsername = null;
      let receiverChat = this.state.receiver.child(`contacts/${myUsername}/chat`);
      let myChat = null;
      let newMsg = {};

      if(msg.value === '')
        return false;
      else
        newMsg = {
          sender: this.state.user.nickname,
          content: msg.value,
        };

      //Obtain the receiver username and set my chat.
      this.state.receiver.once('value')
      .then(snapshot => {
        receiverUsername = snapshot.child('userName').val();
        myChat = this.state.user.ref.child(`contacts/${receiverUsername}/chat`);

        myChat.push().set(newMsg);
        receiverChat.push().set(newMsg);
      })
      .then(() => {
        this.scrollBottom();
        msg.value = '';
      })
      .catch(err => console.log(err))

      // newMsg = {
      //   sender,
      //   content: msg.value,
      // }

      //this.state.receiver.child(`contacts/${sender}/chat`).push().set(newMsg);
  }

  scrollBottom = () => {
    const chat = document.getElementById('chat');

    chat.scrollTo({
      top: (chat.scrollTopMax + 1000),
      behavior: 'smooth'
    });
  }

  saveNewUserInfo = e => {
    const newUserName = document.getElementById('newUserName').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userRef = this.app.database().ref(`users/${this.state.user.userName}`);
    /* NEXT STEP => SAVE A PHOTO. */
    // const newPhoto = document.getElementById('imgInput');
    // newUserInfo.photo = newPhoto;

    let newUserInfo = {}

    e.preventDefault();
    userRef.once('value')
    .then(snapshot => {
      newUserInfo = {...snapshot.val()}
        // userName : newUserName,
        // password : newPassword,
      return newUserInfo;
    })
    .then(newUserInfo => {
      if(newUserInfo.userName !== newUserName)
        newUserInfo.userName = newUserName;

      if(newPassword !== '')
        if(newPassword === confirmPassword)
          newUserInfo.password = newPassword;


        else {
          alert('¡Las contraseñas deben ser identicas!');
          return false;
        }
      else {
        alert('¡Las contraseñas deben ser identicas!');
        return false;
      }

      return newUserInfo;
    })
    .then(res => {
      if(res)
      userRef.set(res)
      .then(() => alert('Guardado correctamente!') /* only CLOSE the editForm */)
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))


  }

  createNewChatRoom = e => {
    e.persist();
    e.preventDefault();
    const ref = this.app.database().ref('chatRooms');
    const minDiceValue = document.getElementById('minValue').value;
    const maxDiceValue = document.getElementById('maxValue').value;
    const name = document.getElementById('chatRoomName').value;
    const newChatRoom = {
      // photo,
      chat: [],
      name,
      minDiceValue,
      maxDiceValue,
      stateMsg: ''
    };

    ref.once('value')
    .then(snapshot => {
      if(snapshot.child(`${name}`).exists()) {
        alert('El nombre de la sala no esta disponible.')
        return false;
      }
      else
        ref.child(`${name}`).set(newChatRoom)
        .then(() => {
          this.toggleModal();
        })
    })
    .catch(err => console.log(err))

// I need to check if the name already exists!!
// The min value CANNOT be bigger than the max value
// Photo input is missing!
// if(ref.exists(`${name}`)) {
//   alert('El nombre de la sala ya esta ocupado.');
//   return false;
// }
// else {
// }
  }

  modifyChatRoom = e => {
    e.persist();
    e.preventDefault();
    const newChatRoomName = document.getElementById('chatRoomName').value;
    const newChatRoomStateMessage = document.getElementById('chatRoomState').value;
    const diceValues = {
      min: document.getElementById('minValue').value,
      max: document.getElementById('maxValue').value
    };

    if(newChatRoomName === '' && diceValues.min === '' && diceValues.max === '' && newChatRoomStateMessage === '')
      return false;
    else if(diceValues.min === '' || diceValues.max === '')
      return false;
    else {
      chatRoomRef.once('value')
      .then(chatRoom => {
        let newChatRoom = chatRoom.val();

        if(diceValues.min != '')
          newChatRoom.maxDiceValue = diceValues.min;
        else
          newChatRoom.minDiceValue = this.state.diceValues.min;

        if(diceValues.max != '')
          newChatRoom.maxDiceValue = diceValues.max;
        else
          newChatRoom.maxDiceValue = this.state.diceValues.max;

        if(newChatRoomName != '') {
          newChatRoom.name = newChatRoomName;
          console.log(newChatRoomName);
        }
        else
          newChatRoom.name = this.state.receiver;

        if(newChatRoomStateMessage != '')
          newChatRoom.stateMsg = newChatRoomStateMessage;
        else
          newChatRoom.stateMsg = this.state.stateMsg;

        chatRoomRef.set(newChatRoom);
        this.toggleModal();
        //this.setState(() => {}, this.toggleModal)
        console.log(newChatRoom);
      })
      .catch(err => console.log(err))
    }
  }

  //We aren't gonna receive nothing - NO!, we receive one thing, wich is
  //Nothing, or a boolean value, if it's true, then send the special message.
  getRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

  sendChatRoomMsg = (diceRoll = false) => {
    const sender = this.state.user.userName;
    const receiver = this.state.receiver; // will be the chatRoom we pick.
    const msg = document.getElementById('chatInput');
    /* I need to change this to the actual chatRoom which the one that has the same .name */

    const {min, max} = this.state.diceValues;

    let newMsg = {
      sender,
      content: msg.value,
      diceRoll
    }

    if(msg.value === '' && !diceRoll)
      return false;

    else if(diceRoll) {

      newMsg.content = this.getRandomNumber(parseInt(min), parseInt(max));
    }

    this.app.database().ref('chatRooms').once('value')
      .then(chatRooms => {
        chatRooms.forEach(chatRoom => {
          console.log(chatRoom.child('name').val()); //undefinedasd
          if(chatRoom.child('name').val() === receiver) {
            let newRef = chatRoom.ref
            console.log(newRef)
            this.app.database().ref(newRef).child('chat').push().set(newMsg)
            .then(() => {
              this.scrollBottom();
              msg.value = '';
            })
            .catch(err => console.log(err)); //this one will do it
          }
        })}
      )
              // if(chatRoom.name === receiver) {
              //   console.log(chatRoom.ref);
              // }
              // else {
              //   console.log(chatRoom);
              // }
  
    // // const receiverChat = this.app.database().ref(`chatRooms/${receiver}/chat`);
    // const {min, max} = this.state.diceValues;

    // let newMsg = {
    //   sender,
    //   content: msg.value,
    //   diceRoll
    // }

    // if(msg.value === '' && !diceRoll)
    //   return false;

    // else if(diceRoll) {
    //   // The dice value we obtaind from getRandomNumber
    //   // We need to use the min and max value of the chatrooms.

    //   newMsg.content = this.getRandomNumber(parseInt(min), parseInt(max));
    // }

    // if(msg.value === '' && !diceRoll)
    //   return false;

    // else if(diceRoll) {
    //   // The dice value we obtaind from getRandomNumber
    //   newMsg.content = diceValue;
    // }

    // receiverChat.push().set(newMsg)
    // .then(() => {
    //   this.scrollBottom();
    //   msg.value = '';
    // })
    // .catch(err => console.log(err));
  }

  handleInputFocus = e => {
    e.persist();
    e.preventDefault();
    e.target.classList.toggle('focusedInput');
  }

  toggleModal = () => {
    this.setState(() => ({
      showCRModal: true
    }), () => {
      document.getElementById('modal').classList.toggle('show-modal');
      setTimeout(() => document.getElementById('modalForm').classList.toggle('modalTransition'), 10);
    })
  }

  componentDidMount = () => {
    const usersRef = this.app.database().ref('users');
    const chatRoomRef = this.app.database().ref('chatRooms');
    /* Put the event only if a msg or a user is set online */
    /* the problem is that everyone is receiving the newChat, so we need to change that...*/
    /* i need to be clear in who is the sender and the receiver of this newMsg */
    /* SOLVED: i put a validation for only the msg's that are send to ME. */

    /* It works, now i need to send to that contact and set true*/
    usersRef.on('child_changed', child => {
      let childUserName = child.child('userName').val();
        this.state.contacts.forEach(contact => {
          if(contact.userName === childUserName) {
            let newContacts = [...this.state.contacts];
            /* find index of the contact, and set the online value to the child changed value */
            newContacts[newContacts.indexOf(contact)].online = child.child('online').val();

            this.setState({contacts: newContacts});
          }
        })
    /* 
    
      this.state.contacts.forEach(contact => {
        for(j = 0; j < values.length; j++) {
          if(values === userName) {
            console.log(userName);
          }
          else {
            console.log(values, userName)
          }
        }
      })
    */


      // for(i = 0; i < this.state.contacts.length; i++) {
      //   let values = Object.values(this.state.contacts[i]);

      //   for(j = 0; j < values.length; j++) {
      //     if(values === userName) {
      //       console.log(userName);
      //     }
      //     else {
      //       console.log(values, userName)
      //     }
      //   }

      // }

      if(this.state.receiver != ' ' && child.child('userName').val() == this.state.user.userName) {
        let chat = child.child(`contacts/${this.state.receiverName}/chat`).val();
        let newChat = Object.values(chat);

        /*Need to be changed to chante the online state of the user. */
        this.setState({chat: newChat});

      /* only if the user scrollHeight is at the bottom */
      /* when a user connect, this cause an error and not appear the user that is now online */
      /* the problem is caused because the function is trying to access to a element that doesn't exists.   */
      // this.scrollBottom();
      this.setContacts();
    }})
//   it doesn't update when I send a new msg.
//   the msg appears to send correctly, but not update MY chat, and i cannot see the changes.
    chatRoomRef.on('child_changed', child => {
      if(this.state.receiver != ' ') {
        let chat = child.child('chat').val();
        chat = Object.values(chat);
        this.setState({ chat });
      }
      /* only if the user scrollHeight is at the bottom */
      /* when a user connect, this cause an error and not appear the user that is now online */
      /* the problem is caused because the function is trying to access to a element that doesn't exists.   */
      // this.scrollBottom();
      /* SOLVED */
      // There was a problem when i set the state with the new chat, and call setChatRoom, this f(x) overwrite
      // chat with the past value, because setState is Async.
    })
  }

  componentWillUnmount = () => {
    const ref = this.app.database().ref(`users`);
    ref.off();
  }

  render() {
    if(this.state.showLogin)
      return(
        <div className='Main'>
          <div className='Main-content'>
            <Login
              toggleShowLogin={this.toggleShowLogin}
              showLoginOptions={this.state.showLoginOptions}
              showRegister={this.state.showRegister}
              authUser={this.authUser}
              user={this.state.user.userName}
              toggleShowRegister={this.toggleShowRegister}
              register={this.register}
            />
        </div>
      </div>
      );
      else if(this.state.inChatRoom)
        return(
          <div className='Main'>
            <div className='Main-content' id='main'>
              {this.state.showCRModal &&
                <CreateCRModal
                  toggleModal={this.toggleModal}
                  handleInputFocus={this.handleInputFocus}
                  createNewChatRoom={this.createNewChatRoom}
                  modifyChatRoom={this.modifyChatRoom}
                  inChatRoom={this.state.inChatRoom}
                />
              }
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
              />
              <Chat
                user={this.state.user.userName}
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
    else if(this.state.showRegister)
      return(
        <div className='Main'>
          <div className='Main-content'>
            <Register
              toggleShowRegister={this.toggleShowRegister}
              register={this.register}
            />
        </div>
      </div>
      );
    else
      return (
        <div className='Main'>
          <div className='Main-content' id='main'>
            {this.state.showCRModal &&
              <CreateCRModal
                toggleModal={this.toggleModal}
                handleInputFocus={this.handleInputFocus}
                createNewChatRoom={this.createNewChatRoom}
                modifyChatRoom={this.modifyChatRoom}
                inChatRoom={this.state.inChatRoom}
              />
            }
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