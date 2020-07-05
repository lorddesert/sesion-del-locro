import React, { Component } from 'react';

import Contact from '../Contact/Contact';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import ChatRoom from '../ChatRoom/ChatRoom';
import './Contacts.scss';
import altUserImg from './resources/altuser.png';
import display from './resources/down-arrow.svg'

class Contacts extends Component {

  addContact = () => {
    alert('añadir modal para agregar contacto:\nnombre de usuario?\nnickname?');
  }

  toggleRotate = () => {
    userCfg = document.getElementById('userCfg');
    // fileInput = document.getElementById('fileInput');
    // console.log(fileInput);
    userCfgPanel = document.getElementById('userCfgPanel');

    userCfg.classList.toggle('rotate');
    const containsDisplay = userCfgPanel.classList.contains('display');

    if(!containsDisplay) {
      userCfgPanel.style.display = 'grid';
      setTimeout(() => userCfgPanel.classList.toggle('display'), 100);
    }
    else {
      userCfgPanel.classList.toggle('display');
      setTimeout(() => userCfgPanel.style.display = 'none', 100);
    }
    // userCfgPanel.style.display = 'block';
  }

  toggleUserConfig = () => {
    this.toggleRotate();
    setTimeout(() => {
      const ref = document.getElementById('userConfig');
      ref.classList.toggle('toggleUserConfig');
    }, 150);
    
  }

  disconnect = () => {
    window.location.reload();
  }

  displayContacts = () => {
    const contacts = document.getElementById('contacts-display');
    const contactsArrow = document.getElementById('contacts-arrow');

    contacts.style.display = 'flex';
    contacts.style.alignItems = 'start';
    contactsArrow.style.transition = 'all ease 150ms'
    contactsArrow.style.transform = 'rotate(0deg)';
  }
  render() {
    return (
      <div className='Contacts'>
        <div className='Contacts-content'>
        <div className='Profile'>
          <div className='Profile-img'>
            {this.props.user.photo ?
              <img src={this.props.user.photo} alt={`${this.props.user.userName}`}></img>
              :
              <img src={altUserImg} alt={this.props.user.userName} />
            }
          </div>
          <div className='Profile-actions' >
            {/* <div className='Action'>
              <svg  className='Action-img' viewBox="-42 0 512 512.002" xmlns="http://www.w3.org/2000/svg"><path fill='#666' d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0"/><path fill='#666' d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594
                11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312
                25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0"/></svg>
            </div> */}
            <div className='Action' onClick={this.toggleRotate} >
              <svg id='userCfg' className='Action-img' viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m499.953125 197.703125-39.351563-8.554687c-3.421874-10.476563-7.660156-20.695313-12.664062-30.539063l21.785156-33.886719c3.890625-6.054687 3.035156-14.003906-2.050781-19.089844l-61.304687-61.304687c-5.085938-5.085937-13.035157-5.941406-19.089844-2.050781l-33.886719 21.785156c-9.84375-5.003906-20.0625-9.242188-30.539063-12.664062l-8.554687-39.351563c-1.527344-7.03125-7.753906-12.046875-14.949219-12.046875h-86.695312c-7.195313 0-13.421875 5.015625-14.949219 12.046875l-8.554687 39.351563c-10.476563 3.421874-20.695313 7.660156-30.539063 12.664062l-33.886719-21.785156c-6.054687-3.890625-14.003906-3.035156-19.089844 2.050781l-61.304687 61.304687c-5.085937 5.085938-5.941406 13.035157-2.050781 19.089844l21.785156 33.886719c-5.003906 9.84375-9.242188 20.0625-12.664062 30.539063l-39.351563 8.554687c-7.03125 1.53125-12.046875 7.753906-12.046875 14.949219v86.695312c0 7.195313 5.015625 13.417969 12.046875 14.949219l39.351563 8.554687c3.421874 10.476563 7.660156 20.695313 12.664062 30.539063l-21.785156 33.886719c-3.890625 6.054687-3.035156 14.003906 2.050781 19.089844l61.304687 61.304687c5.085938 5.085937 13.035157 5.941406 19.089844 2.050781l33.886719-21.785156c9.84375 5.003906 20.0625 9.242188 30.539063 12.664062l8.554687 39.351563c1.527344 7.03125 7.753906 12.046875 14.949219 12.046875h86.695312c7.195313 0 13.421875-5.015625 14.949219-12.046875l8.554687-39.351563c10.476563-3.421874 20.695313-7.660156 30.539063-12.664062l33.886719 21.785156c6.054687 3.890625 14.003906 3.039063 19.089844-2.050781l61.304687-61.304687c5.085937-5.085938 5.941406-13.035157 2.050781-19.089844l-21.785156-33.886719c5.003906-9.84375 9.242188-20.0625 12.664062-30.539063l39.351563-8.554687c7.03125-1.53125 12.046875-7.753906 12.046875-14.949219v-86.695312c0-7.195313-5.015625-13.417969-12.046875-14.949219zm-152.160156 58.296875c0 50.613281-41.179688 91.792969-91.792969 91.792969s-91.792969-41.179688-91.792969-91.792969 41.179688-91.792969 91.792969-91.792969 91.792969 41.179688 91.792969 91.792969zm0 0"/></svg>
            </div>
          </div>
          <div className='userCfgPanel' id='userCfgPanel'>
            <div className='panelOption userConfigPanel'>
              <SecondaryButton value='Ajustes de usuario' action={this.toggleUserConfig}/>
            </div>
            <div className='panelOption logOut'>
              <SecondaryButton value='Cerrar Sesión' action={this.disconnect} />
            </div>
          </div>
        </div>
          {/* onClick will be changed with "enterChatRoom"  */}
          {
            this.props.contacts.map((contact, i) => <Contact
              key={`contact-${i}`}
              contact={contact}
              setChat={this.props.setChat}
              number={i}
            />)
          }
          <div className='chat-room' onClick={() => alert('to chatrooms')}>
            <span>Salas de chat</span>
            <img src={display} alt='display'></img>
          </div>
          {this.props.chatRooms[0] &&
            this.props.chatRooms.map((chatRoom, i) => <ChatRoom
              key={`chatRoom-${i}`}
              chatRoom={chatRoom}
              setChatRoom={this.props.setChatRoom}
              number={i}
            />)
          }
        </div>
      </div>
    );
  }
}

export default Contacts;



  /*
  this.props.chatRoomUsers[0] ?
    this.props.chatRoomUsers.map((contact, i) => <Contact
      key={`contact-${i}`}
      contact={contact}
    />)
  */
  