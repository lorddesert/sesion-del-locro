import React, { Component } from 'react';

import './SecondaryButton.scss';

class SecondaryButton extends Component {
  render() {
    return (
      <div className='SecondaryButton' id={this.props.id} >
        <button className={this.props.className} onClick={this.props.action} >{this.props.value}</button>
      </div>
    );
  }
}

export default SecondaryButton;