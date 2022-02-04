import React, { useContext, useCallback, useEffect } from "react";
import { get, getDatabase, ref } from "firebase/database";
// Components
import Context from "../../context/GlobalContext";
import scrollBottom from "../../scripts/scrollBotom";
import "./Contact.scss";
import altUserImg from "./resources/altuser.png";

const Contact = ({ contact, i, contacts }) => {
  const { globalContext, setGlobalContext } = useContext(Context);

  const setChat = useCallback(async () => {
    try {
      const receiver = {};

      if (window.innerWidth < 768) {
        document.getElementById("main").classList.toggle("show-chat");
      }

      // console.log('contact snapshot flag', contact);

      // return
      // const snapshot = await get(contact.ref)
      // console.log(snapshot)

      receiver.photo = contact.photo;
      receiver.name = contact.nickname;
      // receiver.ref = contact.ref
      receiver.ref = contact.ref;
      receiver.nickname = contact.nickname;

      for (i = 0; i < contacts.length; i++)
        if (contacts[i].nickname === receiver.nickname) {
          setGlobalContext({
            ...globalContext,
            receiver,
            chat: contacts[i].chat,
            inChatRoom: false,
          });

          if (contacts[i].chat.length === 0)
            globalContext.setChat([...contacts[i].chat, 1]);
          else globalContext.setChat(contacts[i].chat);
        }

      // setState(
      //   {
      //     receiver: contactRef.ref,
      //     receiverPhoto,
      //     receiverName,
      //     receiverNickname: this.state.contacts[i].nickname,
      //     chat: this.state.contacts[i].chat,
      //     inChatRoom: false,
      //   }
      scrollBottom();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="Contact" onClick={setChat}>
      <div
        className={contact.online ? "Contact-avatar online" : "Contact-avatar"}
      >
        <img
          id={`contact-${i}`}
          src={contact.photo}
          alt="imagen de perfil"
        ></img>
      </div>
      <div className="Contact-name">
        <span>{contact.nickname}</span>
      </div>
    </div>
  );
};

export default Contact;
