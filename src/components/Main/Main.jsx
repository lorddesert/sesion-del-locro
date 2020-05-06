import React, { Component } from 'react';

import './Main.scss';

import Chat from '../Chat/Chat';
import Contacts from '../Contacts/Contacts';
import Login from '../Login/Login';

import { DB_CONFIG } from '../../config/config';
import firebase from 'firebase';

class Main extends Component {
  app = !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();
  db = this.app.database().ref().child('users');

  state = {
    showLogin: true,
    showLoginOptions: false,
    showRegister: false,
    onlineUsers: [],
    user: ' ',
    chat: [],
    receiver: ' '
  }


  authUser = e => {
    e.preventDefault();
    const ref = this.db;
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('errorMsg');

    if(userName == '' || password == '')
      return false;

    ref.once('value')
    .then(snapshot => {
      const user = snapshot.hasChild(`${userName}`);

       if(user) {
        const authPassword = snapshot.child(`${userName}/password`).val();
        const res = authPassword == `${password}` ? true : false;
        if(res) {
          // send in err msg with
          msg.style.color = 'green';
          msg.innerHTML = 'Usuario encontrado.';
          setTimeout(() => this.setOnlineUsers(userName), 600);
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
    // const provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signInWithPopup(provider)
    // .then(res => {
    //   // This gives you a Facebook Access Token.
    //   const token = res.credential.accessToken;
    //   // The signed-in user info.
    //   const user = res.user;
    //   this.findUser(token, user);
    // });
  }

  toggleShowRegister = () => {
    // change modal for registration.
    this.setState(state => ({
      ...state,
      showRegister: !state.showRegister
    }))
    
  }

  toggleShowLogin = () => {
    this.setOnlineUsers();
    this.setState(state => ({
      ...state,
              showLoginOptions: !state.showLoginOptions
            }))
  }

  login = userName => {
    const ref = this.app.database().ref('onlineUsers');
    const user = userName;

    this.setState(state => ({
      ...state,
      showLogin: false,
      user
    }))

    ref.child(`${userName}`).set(user);
    ref.child(`${userName}`).onDisconnect().remove();
    // this.setOnlineUsers(user);
  }
  setOnlineUsers = user => {
    let users = [];
    const ref = this.app.database().ref('onlineUsers');
    ref.once('value')
    .then(snapshot => {
      snapshot.forEach(child => this.setMessages(user, child, users));
      this.setState({onlineUsers: users});
      this.login(user);
    })
    .catch(err => console.log(err));
  }
  /* Change for setContacts */
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
  setChat = (messages, receiver) => {
    console.log('receiver is: ' + receiver);
    const newMessages = Object.values(messages);
    this.setState({chat: newMessages, receiver});
  }
  setUserChat = messages => {
    // let onlineUsers = this.state.onlineUsers;
    const onlineUsers = [...this.state.onlineUsers];
    for(let i = 0; i < onlineUsers.length; i++) {
    // Finding the user that we are talking to...
      if(messages[0].sender == onlineUsers[i].userName) {
        onlineUsers[i].chat = messages;
        this.setState({onlineUsers});
      }
    }
  }

  sendMsg = (sender = 'anonymus', receiver) => {
    // alert(input.value);
    // it works
    const msg = document.getElementById('chatInput');
    const ref = this.app.database().ref(`onlineUsers/${receiver}/chat`);
    if(msg.value === '')
      return false;
    const newMsg = {
      sender,
      content: msg.value
    }
    ref.once('value')
      .then(snapshot => {
        const obj = snapshot.val();
        const arr = Object.values(obj);
        ref.push().set(newMsg);
      })
      .then(() => {
        this.scrollBottom();
        msg.value = '';
      })
      .catch(err => console.log(err));

  }
  scrollBottom = () => {
    const chat = document.getElementById('chat');
    chat.scrollTo({
      top: (chat.scrollTopMax + 1000),
      behavior: 'smooth'
    });
  }

  componentDidMount = () => {
    const ref = this.app.database().ref('onlineUsers');
    ref.on('child_changed', newMsg => {
      let newChat = [];
      // console.log(newMsg.child('chat').val());
      newMsg.child('chat').forEach(msg => {newChat.push(msg.val())});
      // console.log('newChat:', newChat);
      this.setChat(newChat, this.state.receiver);
      this.setUserChat(newChat);
    });
  }

  render() {
    if(this.state.showLogin)
      return(
        <div className='Main'>
          <div className='Main-content'>
          {this.state.showLogin &&
            <Login
              toggleShowLogin={this.toggleShowLogin}
              showLoginOptions={this.state.showLoginOptions}
              showRegister={this.state.showRegister}
              authUser={this.authUser}
              user={this.state.user}
              toggleShowRegister={this.toggleShowRegister}
            />
          }
        </div>
      </div>
      );
    else
      return (
        <div className='Main'>
          <div className='Main-content'>
            <Contacts
              app={this.app}
              user={this.state.user}
              onlineUsers={this.state.onlineUsers}
              setOnlineUsers={this.setOnlineUsers}
              setChat={this.setChat}
            />
            <Chat
              app={this.app}
              chat={this.state.chat}
              user={this.state.user}
              sendMsg={this.sendMsg}
              receiver={this.state.receiver}
            />
          </div>
        </div>
      );
  }
}

export default Main;