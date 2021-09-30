import React, { useState, useCallback, useEffect, useContext } from "react"
import Context from '../../context/GlobalContext'
import "./Contacts.scss"

// Components
import Contact from "../Contact/Contact"
import SecondaryButton from "../SecondaryButton/SecondaryButton"
import ChatRoom from "../ChatRoom/ChatRoom"

import altUserImg from "./resources/altuser.png"
import add from "./resources/add.svg"

const Contacts = props => {

  const globalContext = useContext(Context)
  const { app, auth } = globalContext

  const [contacts, setContacts] = useState([])

  // useEffect(() => {

  //   //*setContacts
  //   (async () => {
  //     try {
  //       let contacts = [];
  //       const usersRef = app.database().ref("users");
  //       const sender = auth.currentUser.uid;
  //       const myNickname = auth.currentUser.displayName;
  
  //       let snapshot = await usersRef.once("value");
  
  //       snapshot.forEach((user) => {
  //         if (user.val().nickname !== myNickname) {
  //           const { photo, online, nickname } = user.val();
  //           let chat = user.child(`contacts/${sender}/chat`).val();
  
  //           chat = chat ? Object.values(chat) : [];
  
  //           const newContact = {
  //             chat,
  //             photo,
  //             online,
  //             nickname,
  //             ref: user,
  //           };
  
  //           contacts.push(newContact);
  //         }
  //       });
  
  //       setContacts(contacts);
  //     } catch (error) {
  //       console.log(error);
  //     }})()

  // }, [])

  const [chatRooms, setChatRooms] = useState([])

  // useEffect(() => {

  //   //*setChatRooms
  //   (async () => {
  //     try {
  //       const chatRoomRef = app.database().ref("chatRooms");
  //       const snapshot = await chatRoomRef.once("value");
  //       let chatRooms = [];
  
  //       snapshot.forEach((chatRoom) => {
  //         const newChatRoom = {
  //           ...chatRoom.val(),
  //           chat: chatRoom.hasChild("chat")
  //             ? Object.values(chatRoom.child("chat").val())
  //             : [],
  //         };
  
  //         chatRooms.push(newChatRoom);
  //       });
  
  //       setChatRooms(chatRooms)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })()

  // }, [])

  const modal = useCallback(() => {
    const modal = document.getElementById("modal")
    const modalForm = document.getElementById("modalForm")

    setTimeout(() => modalForm.classList.toggle("modalTransition"), 10)
    modal.classList.toggle("show-modal")
  })

  const addContact = useCallback(() => {
    alert("añadir modal para agregar contacto:\nnombre de usuario?\nnickname?")
  })

  const toggleRotate = useCallback(() => {
    let userCfg = document.getElementById("userCfg")
    let userCfgPanel = document.getElementById("userCfgPanel")

    userCfg.classList.toggle("rotate")
    const containsDisplay = userCfgPanel.classList.contains("display")

    if (!containsDisplay) {
      userCfgPanel.style.display = "grid"
      setTimeout(() => userCfgPanel.classList.toggle("display"), 100)
    } else {
      userCfgPanel.classList.toggle("display")
      setTimeout(() => (userCfgPanel.style.display = "none"), 100)
    }
  })

  const toggleUserConfig = useCallback(() => {
    this.toggleRotate()
    setTimeout(() => {
      const ref = document.getElementById("userConfig")
      ref.classList.toggle("toggleUserConfig")
    }, 150)
  })

  const disconnect = useCallback(() => {
    this.props.auth.signOut()
    window.location.reload()
  })

  const displayContacts = useCallback(() => {
    const contacts = document.getElementById("contacts-display")
    const contactsArrow = document.getElementById("contacts-arrow")

    contacts.style.display = "flex"
    contacts.style.alignItems = "start"
    contactsArrow.style.transition = "all ease 150ms"
    contactsArrow.style.transform = "rotate(0deg)"
  })

  const dummyFn = () => alert("asd")
  
    if(contacts.length){
    return (
      <div className="Contacts" id="contacts">
        <div className="Contacts-content">
          <div className="Profile">
            <div className="Profile-img">
              {/* {props.user.photo ? (
                <img
                  // src={props.user.photo || ''}
                  src={''}
                  // alt={`${props.user.nickname || ''}`}
                  alt={`${''}`}
                ></img>
              ) : (
                <img
                  className="alt-user-img"
                  // src={altUserImg || ''}
                  // alt={props.user.nickname || 'default'}
                  src={''}
                  alt={'default'}
                />
              )} */}
            </div>
            <div className="Profile-actions">
              <div className="Action" onClick={toggleRotate}>
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
              <div className="panelOption config">
                <SecondaryButton
                  value="Ajustes de usuario"
                  action={toggleUserConfig}
                />
              </div>
              <div className="panelOption logOut">
                <SecondaryButton
                  value="Cerrar Sesión"
                  action={disconnect}
                />
              </div>
            </div>
          </div>
          {/* onClick will be changed with "enterChatRoom"  */}

          {/* // !FROM HERE */}

          {contacts && contacts.map((contact, i) => (
            <Contact
              key={`contact-${i}`}
              contact={contact || {}}
              // setChat={props.setChat}
              setChat={dummyFn}
              number={i}
            />
          ))}
          <div className="chat-room">
            <span>Salas de chat</span>
            <div
              className="image-wrapper"
              onClick={() => props.toggleModal && props.toggleModal(true)}
            >
              <img src={add} alt="crear sala de chat"></img>
            </div>
          </div>
          {chatRooms.length &&
            chatRooms.map((chatRoom, i) => (
              <ChatRoom
                key={`chatRoom-${i}`}
                chatRoom={chatRoom}
                setChatRoom={props.setChatRoom}
                number={i}
              />
            ))}
        </div>
      </div>
    )}

    else {
        return <div className="Contacts" id="contacts">
        <div className="Contacts-content">
          <div className="Profile">
            <div className="Profile-img">
              {/* {props.user.photo ? (
                <img
                  // src={props.user.photo || ''}
                  src={''}
                  // alt={`${props.user.nickname || ''}`}
                  alt={`${''}`}
                ></img>
              ) : (
                <img
                  className="alt-user-img"
                  // src={altUserImg || ''}
                  // alt={props.user.nickname || 'default'}
                  src={''}
                  alt={'default'}
                />
              )} */}
            </div>
            <div className="Profile-actions">
              <div className="Action" onClick={toggleRotate}>
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
              <div className="panelOption config">
                <SecondaryButton
                  value="Ajustes de usuario"
                  action={toggleUserConfig}
                />
              </div>
              <div className="panelOption logOut">
                <SecondaryButton
                  value="Cerrar Sesión"
                  action={disconnect}
                />
                <div id="flag"><strong style={{color: 'crimson', fontSize: '10rem'}}>FLAG</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
}

export default Contacts
