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
    let userInfoContainer = document.getElementById('userInfoContainer');
    e.preventDefault();

    if(this.state.edit)
    this.toggleEditForm();

    if(!userInfoContainer.classList.contains('closed'))
    userInfoContainer.classList.toggle('closed');

    userCfgRef.classList.toggle('toggleUserConfig');

  }

  toggleEditForm = () => {
    let userInfoContainer = document.getElementById('userInfoContainer');

    userInfoContainer.classList.toggle('closed');

    this.setState(state => ({
      edit: !state.edit
    }));
  }

  render() {
    const { photo, username, nickname } = this.props.user;
    if(!this.state.edit)
      return (
        <div className='userConfig' id='userConfig' >
          <div className='exitImg'>
            <img src={closeImg} alt='exit' onClick={this.toggleShowUserCfg}/>
          </div>
          <div className='userInfoContainer closed' id='userInfoContainer'>
            <div className='userInfo'>
              <div className='userProfile'>
                <img src={photo ? photo : ''} alt={username}/>
                <div className='displayInfo'>
                  <hgroup>
                    <h2>Nombre de usuario</h2>
                    <h3>{username}</h3>
                  </hgroup>
                  <hgroup>
                    <h2>Nickname</h2>
                    <h3>{nickname}</h3>
                  </hgroup>
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
            <div className='userInfoContainer' id='userInfoContainer'>
              <div className='userInfo'>
                <div className='userProfile'>
                  <img src={photo ? photo : ''} alt={username}/>
                  <PrimaryButton
                    action={() => document.getElementById('fileInput').click()}
                    value='Cambiar imagen'
                    className='changeImgBtn'
                  />
                  <input type="file" style={{display: 'none'}} id='fileInput' onChange={this.props.storageImg}/>
                </div>
                <form id='editForm'>
                  <label htmlFor='newUserName'>
                    <h2>Nombre de usuario</h2>
                    <input type="text" id='newUserName' defaultValue={this.props.user.username} />
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