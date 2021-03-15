import React, { Component } from "react";
import "./Contacts.scss";

// Components
import Contact from "../Contact/Contact";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import ChatRoom from "../ChatRoom/ChatRoom";

import altUserImg from "./resources/altuser.png";
import add from "./resources/add.svg";

class Contacts extends Component {
  modal = () => {
    const modal = document.getElementById("modal");
    const modalForm = document.getElementById("modalForm");

    setTimeout(() => modalForm.classList.toggle("modalTransition"), 10);
    modal.classList.toggle("show-modal");
  };

  addContact = () => {
    alert("añadir modal para agregar contacto:\nnombre de usuario?\nnickname?");
  };

  toggleRotate = () => {
    let userCfg = document.getElementById("userCfg");
    let userCfgPanel = document.getElementById("userCfgPanel");

    userCfg.classList.toggle("rotate");
    const containsDisplay = userCfgPanel.classList.contains("display");

    if (!containsDisplay) {
      userCfgPanel.style.display = "grid";
      setTimeout(() => userCfgPanel.classList.toggle("display"), 100);
    } else {
      userCfgPanel.classList.toggle("display");
      setTimeout(() => (userCfgPanel.style.display = "none"), 100);
    }
  };

  toggleUserConfig = () => {
    this.toggleRotate();
    setTimeout(() => {
      const ref = document.getElementById("userConfig");
      ref.classList.toggle("toggleUserConfig");
    }, 150);
  };

  disconnect = () => {
    this.props.auth.signOut();
    window.location.reload();
  };

  displayContacts = () => {
    const contacts = document.getElementById("contacts-display");
    const contactsArrow = document.getElementById("contacts-arrow");

    contacts.style.display = "flex";
    contacts.style.alignItems = "start";
    contactsArrow.style.transition = "all ease 150ms";
    contactsArrow.style.transform = "rotate(0deg)";
  };

  render() {
    return (
      <div className="Contacts" id="contacts">
        <div className="Contacts-content">
          <div className="Profile">
            <div className="Profile-img">
              {this.props.user.photo ? (
                <img
                  src={this.props.user.photo}
                  alt={`${this.props.user.nickname}`}
                ></img>
              ) : (
                <img src={altUserImg} alt={this.props.user.nickname} />
              )}
            </div>
            <div className="Profile-actions">
              <div className="Action" onClick={this.toggleRotate}>
                <svg
                  id="userCfg"
                  className="Action-img"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m499.953125 197.703125-39.351563-8.554687c-3.421874-10.476563-7.660156-20.695313-12.664062-30.539063l21.785156-33.886719c3.890625-6.054687 3.035156-14.003906-2.050781-19.089844l-61.304687-61.304687c-5.085938-5.085937-13.035157-5.941406-19.089844-2.050781l-33.886719 21.785156c-9.84375-5.003906-20.0625-9.242188-30.539063-12.664062l-8.554687-39.351563c-1.527344-7.03125-7.753906-12.046875-14.949219-12.046875h-86.695312c-7.195313 0-13.421875 5.015625-14.949219 12.046875l-8.554687 39.351563c-10.476563 3.421874-20.695313 7.660156-30.539063 12.664062l-33.886719-21.785156c-6.054687-3.890625-14.003906-3.035156-19.089844 2.050781l-61.304687 61.304687c-5.085937 5.085938-5.941406 13.035157-2.050781 19.089844l21.785156 33.886719c-5.003906 9.84375-9.242188 20.0625-12.664062 30.539063l-39.351563 8.554687c-7.03125 1.53125-12.046875 7.753906-12.046875 14.949219v86.695312c0 7.195313 5.015625 13.417969 12.046875 14.949219l39.351563 8.554687c3.421874 10.476563 7.660156 20.695313 12.664062 30.539063l-21.785156 33.886719c-3.890625 6.054687-3.035156 14.003906 2.050781 19.089844l61.304687 61.304687c5.085938 5.085937 13.035157 5.941406 19.089844 2.050781l33.886719-21.785156c9.84375 5.003906 20.0625 9.242188 30.539063 12.664062l8.554687 39.351563c1.527344 7.03125 7.753906 12.046875 14.949219 12.046875h86.695312c7.195313 0 13.421875-5.015625 14.949219-12.046875l8.554687-39.351563c10.476563-3.421874 20.695313-7.660156 30.539063-12.664062l33.886719 21.785156c6.054687 3.890625 14.003906 3.039063 19.089844-2.050781l61.304687-61.304687c5.085937-5.085938 5.941406-13.035157 2.050781-19.089844l-21.785156-33.886719c5.003906-9.84375 9.242188-20.0625 12.664062-30.539063l39.351563-8.554687c7.03125-1.53125 12.046875-7.753906 12.046875-14.949219v-86.695312c0-7.195313-5.015625-13.417969-12.046875-14.949219zm-152.160156 58.296875c0 50.613281-41.179688 91.792969-91.792969 91.792969s-91.792969-41.179688-91.792969-91.792969 41.179688-91.792969 91.792969-91.792969 91.792969 41.179688 91.792969 91.792969zm0 0" />
                </svg>
              </div>
            </div>
            <div className="userCfgPanel" id="userCfgPanel">
              <div className="panelOption userConfigPanel">
                <SecondaryButton
                  value="Ajustes de usuario"
                  action={this.toggleUserConfig}
                />
              </div>
              <div className="panelOption logOut">
                <SecondaryButton
                  value="Cerrar Sesión"
                  action={this.disconnect}
                />
              </div>
            </div>
          </div>
          {/* onClick will be changed with "enterChatRoom"  */}
          {this.props.contacts.map((contact, i) => (
            <Contact
              key={`contact-${i}`}
              contact={contact}
              setChat={this.props.setChat}
              number={i}
            />
          ))}
          <div className="chat-room">
            <span>Salas de chat</span>
            <div
              className="image-wrapper"
              onClick={() => this.props.toggleModal(true)}
            >
              <img src={add} alt="crear sala de chat"></img>
            </div>
          </div>
          {this.props.chatRooms[0] &&
            this.props.chatRooms.map((chatRoom, i) => (
              <ChatRoom
                key={`chatRoom-${i}`}
                chatRoom={chatRoom}
                setChatRoom={this.props.setChatRoom}
                number={i}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Contacts;
