import React, { Component } from 'react';

import './Login.scss';
import locro from './resources/locro.jpg';
import logo from './resources/logo.svg';

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
            <div>
              <h2>SDL</h2>
              {/* <img src='https://frasesparami.com/wp-content/uploads/2019/09/imagenes-bonitas.jpg' alt='logo' width='50px' /> */}
              <img src={logo} alt='logo' width='50px' />
            </div>
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
              <SecondaryButton id='link' value='¿No tienes una cuenta?' action={this.props.toggleShowRegister}/>
            </div>
            </form>
          </div>
        </div>
      );
  }
}

export default Login;