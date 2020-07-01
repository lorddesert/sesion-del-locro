import React, { Component } from 'react';

import './Message.scss';

class Message extends Component {
  msgRef = React.createRef();
  style = '';
  justifyContent = {justifyContent: 'start'}
  render() {
    // if sender == user => background: #DDFC74, messageOwner.display = none.
    /* msg.classList.toggle('myMsg?') */
    if(this.props.sender == this.props.user) {
      this.justifyContent = {justifyContent: 'end'}
      this.style = 'Switch'
    }
    return (
    <div className='Message-wrapper' style={this.justifyContent}>
      <div className={`Message ${this.style}`} >
         {this.props.sender != this.props.user &&
          <div className='Message-owner' ref={this.msgOwnerRef}>
            <span>
              {this.props.sender}
            </span>
          </div>
          }
          <div className='Message-content'>
            <span>
              {this.props.content}
              </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;