import React, { Component } from 'react';

import './Login.scss';
import locro from './resources/locro.jpg';

import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';


class Login extends Component {

  state = {
    showLogin: true
  }

  toggleShow = () => {
    this.setState(state => ({
      showLogin: !state.showLogin
    }));
  }

  render() {
      return (
        <div className='Login'>
         <img  className='Login-img' src={locro} alt='locro background'/>
          <div className='Login-form-container'>
            <h2>Sesion del Locro</h2>
            <form className='Login-form'>
              <span id='errorMsg'></span>
              <label htmlFor='username'>
                <input type='text' id='username' placeholder='Nombre de usuario'/>
              </label>
              <label htmlFor='password'>
                <input type='password' id='password' placeholder='Contraseña'/>
              </label>
              <label htmlFor='submit'>
                <PrimaryButton id='submit' value='Iniciar sesión' action={this.props.authUser}/>
              </label>
            <div className='links'>
              <a href="#"><span>¿No tienes una cuenta?</span></a>
              <a href="#"><span>¿No recuerdas tu contraseña?</span></a>
            </div>
            </form>
          </div>
        </div>
      );
  }
}

export default Login;