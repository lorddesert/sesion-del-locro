import React, { Component } from 'react';

import './PrimaryButton.scss';

class PrimaryButton extends Component {
  render() {
    return (
      <div onClick={this.props.action} className='PrimaryButton' id={this.props.id}>
        <button onFocus={this.props.focus} className={`${this.props.className}`}>{this.props.value}</button>
      </div>
    );
  }
}

export default PrimaryButton;