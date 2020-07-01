import React, { Component } from 'react';

import './PrimaryButton.scss';

class PrimaryButton extends Component {
  render() {
    return (
      <div className='PrimaryButton' id={this.props.id && this.props.id}>
        <button className={`${this.props.className}`} onClick={this.props.action} >{this.props.value}</button>
      </div>
    );
  }
}

export default PrimaryButton;