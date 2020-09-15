import React, { Component } from 'react';
import Message from '../Message/Message';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import ChatHeader from '../ChatHeader/ChatHeader';

import './Chat.scss';
import sendImg from './resources/send.png';
import quote from './resources/quote.svg';
import dice from './resources/dice.svg';

class Chat extends Component {

  state = {
    showNumber : false
  }

  /* It will roll automacly, it doesn't gonna show the panel */
  // showDice = () => {
  //   const dice = document.getElementById('dice');

  //   if(dice.style.display === 'flex') {
  //     dice.classList.toggle('show-dice');
  //     setTimeout(() => dice.style.display = 'none', 50)
  //   }

  //   else {
  //     dice.style.display = 'flex';
  //     setTimeout(() => dice.classList.add('show-dice'), 50);
  //   }

  // }

  getRandomNumber = (min, max) => {
    console.log('numeros: ', min, max);
    console.log(typeof(min), typeof(max));
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  /* rollDice = () => {
    BEFORE that we need to change the data structure for add a condition to verify
    if the MSG is a dice roll or not, something like => diceRoll: true || false

    if(msg.diceRoll) {
      msg.classList.add('diceRollMsg');
    }

    1) We get the MIN and MAX value of the dice in the chatRoom settings (something like that).
    2) Get a random number.
    3) Show it like special MSG

  }

  */

  rollDice = () => {
    console.log(`min: ${min}, max: ${max}`);
    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;
    let count = 0;

    if(min === '' || max === '' || min > max)
      return false;

      this.setState(state => ({
        showNumber: !state.showNumber
      }));

      const interval = setInterval(() => {
        const number = document.getElementById('number');
        const randomNumber = this.getRandomNumber(parseInt(min), parseInt(max));
        number.innerText = `${randomNumber}`
        count++;

        if(count == 20) {
          clearInterval(interval);
          setTimeout(() => this.setState({showNumber: false}), 1000);

        }

      }, 40);
  }

  handleEvent = e => {
    if(e.keyCode === 13)
      if(this.props.inChatRoom)
        this.props.sendChatRoomMsg();

      else
        this.props.sendMsg2();
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleEvent);
  }

  render() {
    if(this.props.receiver) {
      return (
      <div className='Chat'>
        <div className='Chat-content' id='chatContent' >
          <ChatHeader />
          <div className='chat-wrapper'></div>
          <div className='Chat-messages' id='chat'>
            { this.props.chat.map((msg, i) =>
              <Message
                key={`msg-${i}`}
                user={this.props.user}
                sender={`${msg.sender}`}
                content={msg.content}
                userNumber={i}
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
                  <div onClick={this.handleEvent} className='Input-img'>
                    <img src={dice}></img>
                  </div>
                </div>
              }
              <div className='Input-img-container'>
                <div onClick={() => this.handleEvent} className='Input-img'>
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
      /*
        <Dice />
      */
}

export default Chat;