import React, { Component, useContext } from "react";
// import Context from '../../context/GlobalContext'

import "./Message.scss";

const Message = props => {
  // let {context} = useContext(Context)
  // let user = context.globalContext.user

  let msgRef = React.createRef();
  let style = "";
  let justifyContent = {};

    // console.log(props.sender, props.user)
      if (props.sender === props.user) {
        justifyContent = { justifyContent: "flex-end" };
        style = "Switch";
      } else {
        console.log(props.sender, props.user)
        justifyContent = { justifyContent: "flex-start" };
        style = "";
      }

    return (
      <div className="Message-wrapper" style={justifyContent}>
        <div
          className={
            props.diceRoll
              ? `Message ${style} dice-roll`
              : `Message ${style}`
          }
        >
          {props.sender !== props.user && (
            <div className="Message-owner" ref={msgRef}>
              <h3>{props.nickname}</h3>
            </div>
           )} 
          <div className="Message-content">
            <p>{props.content}</p>
          </div>
        </div>
      </div>
    );
}

export default Message;