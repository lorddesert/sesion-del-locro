import React, { Component } from 'react';
import './Register.scss';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';

class Register extends Component {
  state = {
    stepTwo: false
  }
  render() {
    return(
      <div className='Register'>
        <SecondaryButton id='return' value='Volver' action={this.props.toggleShowRegister} />
       <main>
        <form className='registerForm'>
          <div style={{display: 'flex', placeItems: 'center'}}>
            <div id='userImage'></div>
            <SecondaryButton value='Elegir foto' />
          </div>
          <span id='errorMsg'></span>
          <label htmlFor="username"></label>
          <h2>Nombre de la sala</h2>
          <input type="text" id='username' name='username' required onFocus={this.props.handleInputFocus} onBlur={this.props.handleInputFocus}/>
          <label htmlFor="password"></label>
          <h2>Contraseña</h2>
          <input type="text" id='password' name='password' required onFocus={this.props.handleInputFocus} onBlur={this.props.handleInputFocus}/>
          <label htmlFor="nickname"></label>
          <h2>Nickname</h2>
          <input type="text" id='nickname' name='nickname' required onFocus={this.props.handleInputFocus} onBlur={this.props.handleInputFocus}/>
          {/* <input type="text" id='username' placeholder='Nombre de usuario'/>
          <input type="text" id='password' placeholder='Contraseña'/>
          <input type="text" id='nickname' placeholder='Nickname'/> */}
          <div className='imageContainer'>
          </div>
          <PrimaryButton value='Registrarse' action={this.props.register}/>
          <p>ó</p>
          <SecondaryButton id='logIn' value='Inicia Sesión' action={this.props.toggleShowRegister} />
        </form>
       </main>
      </div>
    )
  }
  // render() {
  //   if(!this.state.stepTwo)
  //     return (
  //       <div className='Register'>
  //         <h2>Registro</h2>
  //         <form className='registerForm'>
  //           <input type="text" placeholder='Nombre de usuario'/>
  //           <input type="text" placeholder='Contraseña'/>
  //           <PrimaryButton value='CONTINUAR' action={e => {
  //           e.preventDefault();
  //           this.setState({stepTwo: true});
  //         }}/>
  //         </form>
  //         <div className='stepBalls stepOne'>
  //           <div id='ball1'></div>
  //           <div id='ball2'></div>
  //         </div>
  //       </div>
  //     )
  //   else
  //     return (
  //     <div className='Register'>
  //       <h2>Unos ultimos ajustes</h2>
  //       <form className='registerForm'>
  //         <input type="text" placeholder='Nickname'/>
  //         <div className='imageContainer'>
  //           <div id='userImage'></div>
  //           <SecondaryButton value='Elegir foto' />
  //         </div>
  //         <PrimaryButton value='CONTINUAR' action={() => alert('asdasd')}/>
  //       </form>
  //       <div className='stepBalls stepTwo'>
  //         <div id='ball1'></div>
  //         <div id='ball2'></div>
  //       </div>
  //     </div>
  //   )
  
}

export default Register;