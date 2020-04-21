import React, { Component } from 'react';

import './Login.scss';

import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';


class Login extends Component {
  render() {
    if(this.props.showLoginOptions) {
      return (
        <div className='Login'>
            <div className='Login-options'>
              <div className='Login-option' >
               <PrimaryButton className='Facebook' value='Facebook' action={this.props.authWithFB} />
              </div>
                <SecondaryButton value='Volver' action={this.props.toggleShowLogin}/>
            </div>
        </div>
      );
    }
    else if(this.props.showRegister) {
      return (
        <div className='Login'>
            <div className='Login-options'>
              <div className='Register-form'>
                <div className='Form-label'>
                  <span>Nombre de usuario</span>
                  <input type='text'/>
                </div>
                <div className='Form-label'>
                  <span>Contraseña</span>
                  <input type='text'/>
                </div>
                <div>
                  <PrimaryButton value='Registrate' action={() => alert('Hello World')} />
                </div>
                <SecondaryButton size='10px' value='Volver' action={this.props.toggleShowRegister} />
              </div>
            </div>
        </div>
      );
    }
    else {
      return(
        <div className='Login'>
            <div className='Login-options'>
              <div className='Login-option'>
                <PrimaryButton value='Iniciar Sesión' action={this.props.toggleShowLogin}/>
              <span style={{color: '#fff'}}>ó</span>
                <SecondaryButton value='Registrate' action={this.props.toggleShowRegister}/>
              </div>
            </div>
        </div>
      );
    }
  }
}

export default Login;