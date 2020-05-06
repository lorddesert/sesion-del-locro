import React, { Component } from 'react';

import './Login.scss';
import locro from './resources/locro.png';

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
            <form className={this.props.showLogin ? 'Login-form' : 'Register-form'}>
              <div className='topImg'>
                <h2>S</h2>
              </div>
               <div className='top2Img'>
                <img src={locro} alt='locro'></img>
              </div>
              <div className='title'>
                {this.state.showLogin ?
                <h2>Iniciar Sesión</h2>
                :
                <h2>Registrarse</h2>
                }
              </div>
              <div className='errorMsg'>
                <span id='errorMsg'></span>
              </div>
              <div className='userName-title'>
                <span>Nombre de usuario</span>
              </div>
               <div className='userName-input'>
                <input type='text' placeholder='Enter username' id='userName' required/>
              </div>
              <div className='passsword-title'>
                <span>Contraseña</span>
              </div>
              <div className='password-input'>
                <input type='password' placeholder='Enter password' id='password' required/>
              </div>
              <div className='submit-btn'>
                {this.state.showLogin ?
                  <PrimaryButton value='Iniciar Sesión' action={this.props.authUser} />
                  :
                  <PrimaryButton value='Registrate' action={this.props.authUser} />
                }
              </div>
              <div className='register'>
                <div>
                  {this.state.showLogin ?
                    <p>¿No tienes una cuenta?, <span onClick={this.toggleShow}>¡Registrate!</span></p>
                  :
                    <p>¿Ya tienes una cuenta?, <span onClick={this.toggleShow}>¡Inicia sesión!</span></p>
                  }
                </div>
              </div>
                <div className='bottomLetter'>
                  <h2>S</h2>
                </div>
                <div className='bottom2Img'>
                  <img src={locro} alt='locro'></img>
                </div>
            </form>
        </div>
      );
  }
}

export default Login;