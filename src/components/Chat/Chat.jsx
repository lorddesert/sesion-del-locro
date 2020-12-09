import React, { Component } from 'react';
import Message from '../Message/Message';
import ChatHeader from '../ChatHeader/ChatHeader';

import './Chat.scss';
import sendImg from './resources/send.png';
import quote from './resources/quote.svg';
import dice from './resources/dice.svg';

class Chat extends Component {

  state = {
    showNumber : false
  }

  handleEvent = () => {
      if(this.props.inChatRoom)
        this.props.sendChatRoomMsg();

      else
        this.props.sendMsg2();
  }

  componentDidMount() {
    document.addEventListener('keyup', e => e.key === 'Enter'? this.handleEvent() : null);
  }

  render() {
    if(this.props.receiver) {
      return (
      <div className='Chat'>
        <div className='Chat-content' id='chatContent' >
          <ChatHeader
            receiverPhoto={this.props.receiverPhoto}
            receiverName={this.props.receiverName}
            stateMsg={this.props.stateMsg}
            toggleModal={this.props.toggleModal}
            inChatRoom={this.props.inChatRoom}
          />
          <div className='chat-wrapper'></div>
          <div className='Chat-messages' id='chat'>
            { this.props.chat.map((msg, i) =>
              <Message
                key={`msg-${i}`}
                user={this.props.user}
                userNumber={i}
                nickname={this.props.receiverNickname}
                sender={`${msg.sender}`}
                content={msg.content}
                diceRoll={msg.diceRoll}
              />)
            }
          </div>
          <div className='Chat-input-container'>
              <div className='Chat-input'>
                <input type='text' id='chatInput' placeholder='Escribe un mensaje' autoFocus />
              </div>
              {this.props.inChatRoom &&
                <div className='Input-img-container'>
                    {/* this.props.sendChatRoomMsg(this.getRandomNumber(diceMin, diceMax), true) diceRoll = true */}
                  <div onClick={() => this.props.sendChatRoomMsg(true)} className='Input-img' onTouchEnd={() => this.props.sendChatRoomMsg(true)}>
                    <img src={dice}></img>
                  </div>
                </div>
              }
              <div className='Input-img-container'>
                <div onClick={this.handleEvent} className='Input-img' onTouchEnd={this.handleEvent}>
                  <img src={sendImg}></img>
                </div>
              </div>
          </div>
        </div>
      </div>
      );
    }
    else {
      return(
        <div className='Chat' id='chat' >
          <div className='Chat-content' >
            <div className='intro'>
              <hgroup>
                <h2>¡Bienvenido!</h2>
                <h3>¿Listo para otra gran aventura?</h3>
              </hgroup>
              <div className='quotes'>
              <p>Si no, puedes tomar este consejo de nuestros autoproclamados expertos:</p>
                <blockquote>
                  <img src={quote} alt='quatation marks'/>
                  <p>El que me crea que me crea el que no me crea que no me crea. <strong className='autor'>- Desconocido</strong></p>
                  <img src={quote} style={{transform: 'rotate(180deg)'}} alt='quatation marks'/>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Chat;