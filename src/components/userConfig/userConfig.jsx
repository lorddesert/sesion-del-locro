import React, { Component } from 'react';
import './userConfig.scss';
import closeImg from './resources/close.svg';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';

class userConfig extends Component {

  state = {
    edit: false
  }

  toggleShowUserCfg = e => {
    const userCfgRef = document.getElementById('userConfig');

    e.preventDefault();

    if(this.state.edit)
      this.toggleEditForm();

    userCfgRef.classList.toggle('toggleUserConfig');

  }

  toggleEditForm = () => {
    this.setState(state => ({
      edit: !state.edit
    }));
  }

  render() {
    const { photo, userName } = this.props.user;
    if(!this.state.edit)
      return (
        <div className='userConfig' id='userConfig'>
          <div className='exitImg'>
            <img  src={closeImg} alt='exit' onClick={this.toggleShowUserCfg} />
          </div>
          <div className='userInfoContainer'>
            <div className='userInfo'>
              <div className='userProfile'>
                <img src={photo ? photo : ''} alt={userName}/>
                <div style={{display: 'flex', flexDirection: 'column', gap: '.5em'}}>
                  <h2>Nombre de usuario</h2>
                  <h3>{userName}</h3>
                </div>
              </div>
              <PrimaryButton
                action={this.toggleEditForm}
                value='Editar'
                id='editBtn'
                className='primaryConfigBtn'
              />
            </div>
          </div>
        </div>
      );
      else
        return(
          <div className='userConfig' id='userConfig'>
            <div className='exitImg'>
              <img  src={closeImg ? closeImg : ''} alt='exit' onClick={this.toggleShowUserCfg} />
            </div>
            <div className='userInfoContainer'>
              <div className='userInfo'>
                <div className='userProfile'>
                  <img src={photo ? photo : ''} alt={userName}/>
                  <PrimaryButton
                    action={() => document.getElementById('fileInput').click()}
                    value='Cambiar imagen'
                    className='primaryConfigBtn'
                  />
                  <input type="file" style={{display: 'none'}} id='fileInput' onChange={this.props.storageImg}/>
                </div>
                <form id='editForm'>
                  <label htmlFor='newUserName'>
                    <h2>Nombre de usuario</h2>
                    <input type="text" id='newUserName' defaultValue={this.props.user.userName} />
                  </label>
                  <label htmlFor='newPassword'>
                    <h2>Nueva contraseña</h2>
                    <input type="text" id='newPassword' pattern='{6,}' placeholder='6 caracteres minimo.' />
                  </label>
                  <label htmlFor='confirmPassword'>
                    <h2>Confirmar contraseña</h2>
                    <input type="text" id='confirmPassword' pattern='{6,}' placeholder='6 caracteres minimo.' />
                  </label>
                  <div className='formButtons'>
                    <SecondaryButton action={this.toggleShowUserCfg} value='Cancelar' />
                    <PrimaryButton action={this.props.saveNewUserInfo} value='Guardar' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
  }
}

export default userConfig;