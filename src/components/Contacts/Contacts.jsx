import React, { useState, useEffect, useCallback, useContext } from "react"
import { get, getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth'

import "./Contacts.scss"
import Context from '../../context/GlobalContext'

// Components
import Contact from "../Contact/Contact"

import ChatRooms from "../ChatRooms/ChatRooms"

const Contacts = props => {

  let context = useContext(Context);
  if('globalContext' in context) context = {...context.globalContext}

  const {app, auth, receiver} = context

  const [contacts, setContacts] = useState([])

  useEffect(() => {
  
  const fetchContacts = async () => {
    try {
      let contacts = [];
      const usersRef = ref(getDatabase(), "users/");
      const sender = getAuth().currentUser.uid;
      const myNickname = getAuth().currentUser.displayName;

     const snapshot = await get(usersRef)

     
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

  useEffect(() => {

    //*setChatRooms
    async function fetchChatRooms () {
      try {
        const chatRoomRef = ref(getDatabase(), "chatRooms");
        const snapshot = await get(chatRoomRef);
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
  
        setChatRooms(chatRooms)
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchChatRooms()

  }, [])

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
        {/* <Profile toggleRotate={toggleRotate}/> */}
        <div className="contacts-wrapper">
          {contacts && contacts.map((contact, i) => (
            <Contact
            key={`contact-${i}`}
            contact={contact}
            contacts={contacts}
            number={i}
            />
            ))}

          <ChatRooms chatRooms={chatRooms} />
          </div>
        </div>
      </div>
    )}

    else {
        return <div className="Contacts" id="contacts">
        <div className="Contacts-content">
          <div id="flag" style={{paddingLeft: "5em",transform: "rotate(90deg)"}}>
            <strong id="flagAnimation" style={{fontSize: '10rem', overflow: 'hidden'}}>
                LOA<br/>DING
              </strong>
            </div>
        </div>
      </div>
    }
}

export default Contacts
