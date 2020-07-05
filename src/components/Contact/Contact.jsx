import React, { Component } from 'react';

import './Contact.scss';
import altUserImg from './resources/altuser.png';

class Contact extends Component {

  componentDidMount = () => {
    const contactAvatar = document.getElementById(`contact-${this.props.number}`);

    if(!this.props.contact.online) {
      contactAvatar.style.border = 'none';
      console.log(`contact-${this.props.number} is offline`);
    } else {
      contactAvatar.style.border = '3px solid green';
    }
  }

  render() {
    return (
      <div className="Contact" onClick={this.props.setChat && (() => this.props.setChat(this.props.contact.userName, this.props.contact.ref))}>
        <div className="Contact-avatar">
          {this.props.contact.photo ?
            <img id={`contact-${this.props.number}`} src={this.props.contact.photo} alt='contact image'></img>
            :
            <div className='alternative-img'>
              <img id={`contact-${this.props.number}`} src={altUserImg} alt={this.props.contact.userName} style={{background: '#e3e3e3'}} />
            </div>
          }
        </div>
        <div className="Contact-name">
          <span>{this.props.contact.userName}</span>
        </div>
      </div>
    );
  }
}

export default Contact;