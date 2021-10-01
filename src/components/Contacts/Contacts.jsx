import React, { useState, useEffect, useCallback, useContext } from "react"
import "./Contacts.scss"
import GlobalContext from '../../context/GlobalContext'

// Components
import Contact from "../Contact/Contact"
import Profile from "../Profile/Profile"

import add from "./resources/add.svg"
import ChatRooms from "../ChatRooms/ChatRooms"

const Contacts = props => {

  const { globalContext } = useContext(GlobalContext)
  const { app, auth } = globalContext

  console.log(auth)

  const [contacts, setContacts] = useState([])

  useEffect(() => {
    console.log('contacts: ', contacts)
    
  const fetchContacts = async () => {
    try {
      let contacts = [];
      const usersRef = app.database().ref("users");
      const sender = auth.currentUser.uid;
      const myNickname = auth.currentUser.displayName;

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

      setContacts(contacts);
    } catch (error) {
      console.log(error);
    }}

    fetchContacts()

    //*setContacts
  }, [])

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

  const displayContacts = useCallback(() => {
    const contacts = document.getElementById("contacts-display")
    const contactsArrow = document.getElementById("contacts-arrow")

    contacts.style.display = "flex"
    contacts.style.alignItems = "start"
    contactsArrow.style.transition = "all ease 150ms"
    contactsArrow.style.transform = "rotate(0deg)"
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
  const dummyFn = () => alert("asd")
  
    if(contacts.length){
    return (
      <div className="Contacts" id="contacts">
        <div className="Contacts-content">
        <Profile toggleRotate={toggleRotate}/>

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

          <ChatRooms chatRooms={chatRooms} />
        </div>
      </div>
    )}

    else {
        return <div className="Contacts" id="contacts">
        <div className="Contacts-content">
          <Profile />
          <div id="flag" style={{paddingLeft: "5em",transform: "rotate(90deg)"}}>
            <strong id="flagAnimation" style={{fontSize: '10rem'}}>
              <span id="flag1">F</span>
              <span id="flag2">L</span>
              <span id="flag3">A</span>
              <span id="flag4">G</span>
              </strong>
            </div>
        </div>
      </div>
    }
}

export default Contacts
