import React, { useState, useEffect, useCallback, useContext } from "react"
import { get, getDatabase, onValue, ref, onChildChanged } from 'firebase/database'
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
  
  useEffect(() => {
    fetchContacts()

    const unsubscribe = onChildChanged(ref(getDatabase(), 'users'), () => {
      fetchContacts()
    })
  
    return () => {
      unsubscribe()
    }
  }, [])

  const [chatRooms, setChatRooms] = useState([])

  
  useEffect(() => {
    fetchChatRooms()

    const unsubscribe = onChildChanged(ref(getDatabase(), 'chatRooms'), () => {
      fetchChatRooms()
    })
  
    return () => {
      unsubscribe()
    }

  }, [])

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
