import React, { Component, useContext } from "react";
// import Context from '../../context/GlobalContext'

import "./Message.scss";

class Message extends Component {
  // context = useContext(Context)
  // user = context.globalContext
  msgRef = React.createRef();
  style = "";
  justifyContent = {};
  render() {
    // if sender == user => background: #DDFC74, messageOwner.display = none.
    /* msg.classList.toggle('myMsg?') */
    console.log(this.props.sender, this.props.user)
      if (this.props.sender !== this.props.user) {
        this.justifyContent = { justifyContent: "flex-start" };
        this.style = "";
      } else {
        this.justifyContent = { justifyContent: "flex-end" };
        this.style = "Switch";
      }

    return (
      <div className="Message-wrapper" style={this.justifyContent}>
        <div
          className={
            this.props.diceRoll
              ? `Message ${this.style} dice-roll`
              : `Message ${this.style}`
          }
        >
          {this.props.sender != this.props.user && (
            <div className="Message-owner" ref={this.msgOwnerRef}>
              <h3>{this.props.sender}</h3>
            </div>
          )}
          <div className="Message-content">
            <p>{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;