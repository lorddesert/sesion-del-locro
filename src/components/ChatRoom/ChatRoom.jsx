import React, { Component } from 'react';
import './ChatRoom.scss';
// import chatRoomImg from './resources/chat-room.svg';

class ChatRoom extends Component {
  render() {
    return (
      <div className="ChatRoom" onClick={() => this.props.setChatRoom(this.props.chatRoom.name)}>
        <div className="ChatRoom-image">
          {this.props.chatRoom.photo ?
            <img
              id={`ChatRoom-${this.props.number}`}
              src={this.props.chatRoom.photo}
              alt='ChatRoom image'
            />
            :
            <div className='alternative-img'>
              <img
                id={`ChatRoom-${this.props.number}`}
                src={chatRoomImg} alt={this.props.chatRoom.userName}
                style={{background: '#e3e3e3'}}
              />
            </div>
          }
        </div>
        <div className="ChatRoom-name">
          <span>{this.props.chatRoom.name}</span>
        </div>
      </div>
    );
  }
}

export default ChatRoom;