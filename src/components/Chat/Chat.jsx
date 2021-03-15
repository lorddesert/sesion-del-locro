import React, { useState, useEffect, useCallback } from "react";
import Message from "../Message/Message";
import ChatHeader from "../ChatHeader/ChatHeader";

import "./Chat.scss";
import sendImg from "./resources/send.png";
import quote from "./resources/quote.svg";
import dice from "./resources/dice.svg";

const Chat = (props) => {
  const handleEvent = useCallback((e) => {
    if (e.key === "Enter") {
      console.log("Enter pressed!!");
      if (props.inChatRoom) props.sendChatRoomMsg();
      else props.sendMsg2();
    }
  });

  useEffect(() => {
    window.addEventListener("keyup", handleEvent);

    return () => window.removeEventListener("keyup", handleEvent);
  }, []);

  if (props.receiver) {
    return (
      <div className="Chat">
        <div className="Chat-content" id="chatContent">
          <ChatHeader
            receiverPhoto={props.receiverPhoto}
            receiverName={props.receiverName}
            stateMsg={props.stateMsg}
            toggleModal={props.toggleModal}
            inChatRoom={props.inChatRoom}
          />
          <div className="chat-wrapper"></div>
          <div className="Chat-messages" id="chat">
            {props.chat.map((msg, i) => (
              <Message
                key={`msg-${i}`}
                user={props.user}
                userNumber={i}
                nickname={props.receiverNickname}
                sender={`${msg.sender}`}
                content={msg.content}
                diceRoll={msg.diceRoll}
              />
            ))}
          </div>
          <div className="Chat-input-container">
            <div className="Chat-input">
              <input
                type="text"
                id="chatInput"
                placeholder="Escribe un mensaje"
                autoFocus
              />
            </div>
            {props.inChatRoom && (
              <div className="Input-img-container">
                {/* props.sendChatRoomMsg(getRandomNumber(diceMin, diceMax), true) diceRoll = true */}
                <div
                  onClick={() => props.sendChatRoomMsg(true)}
                  className="Input-img"
                  onTouchEnd={() => props.sendChatRoomMsg(true)}
                >
                  <img src={dice}></img>
                </div>
              </div>
            )}
            <div className="Input-img-container">
              <div
                onClick={() => handleEvent(props)}
                className="Input-img"
                onTouchEnd={() => handleEvent(props)}
                id="sendMsg"
              >
                <img src={sendImg}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Chat" id="chat">
        <div className="Chat-content">
          <div className="intro">
            <hgroup>
              <h2>¡Bienvenido!</h2>
              <h3>¿Listo para otra gran aventura?</h3>
            </hgroup>
            <div className="quotes">
              <p>
                Si no, puedes tomar este consejo de nuestros autoproclamados
                expertos:
              </p>
              <blockquote>
                <img src={quote} alt="quatation marks" />
                <p>
                  El que me crea que me crea el que no me crea que no me crea.{" "}
                  <strong className="autor">- Desconocido</strong>
                </p>
                <img
                  src={quote}
                  style={{ transform: "rotate(180deg)" }}
                  alt="quatation marks"
                />
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Chat;
