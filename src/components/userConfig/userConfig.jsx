import React, { useState, useCallback, useContext } from "react";
import Context from '../../context/GlobalContext'

import "./userConfig.scss";
import closeImg from "./resources/close.svg";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import { auth } from "firebase";

const userConfig = props => {

 const { globalContext } = useContext(Context);

  const { app, auth, user } = globalContext
  
  const { photoURL, displayName, email } = user

  // if('globalContext' in context) context = {...context.globalContext}

  const [edit, setEdit] = useState(false)

  const toggleShowUserCfg = useCallback((e) => {
    if(e)
    e.preventDefault()
    setEdit(!!edit)

    const userCfgRef = document.querySelector("#userConfig");
    let userInfoContainer = document.querySelector("#userInfoContainer");

    if (!userInfoContainer.classList.contains("closed")) 
      userInfoContainer.classList.toggle("closed");

    userCfgRef.classList.toggle("toggleUserConfig");
  }, []);

  const toggleEditForm = useCallback((e) => {
    e.preventDefault()

    setEdit(!edit)
  }, []);

  const saveNewUserInfo = async (e) => {
    e.preventDefault()
  
    const newNickname = document.querySelector("#newdisplayName").value
    const newPassword = document.querySelector("#newPassword").value
    const confirmPassword = document.querySelector("#confirmPassword").value
    const user = auth.currentUser
    
    const userRef = app
      .database()
      .ref(`users/${user.uid}`)
    const res = await userRef.child("nickname").once("value")
    const oldNickname = res.val()

      if (newPassword !== "")
        if (newPassword === confirmPassword)
          user.updatePassword(newPassword)

        else {
          alert("¡Las contraseñas deben ser identicas!")
          return false
        }
      
      if (oldNickname !== newNickname) {
        await user.updateProfile({displayName: newNickname})
        userRef.child("nickname").set(newNickname)
      }

      alert("Usuario actualizado!")
      toggleShowUserCfg()
  }

  //* Folded
    if (!edit)
      return (
        <div className="userConfig" id="userConfig">
          <div className="exitImg">
            <img src={closeImg} alt="exit" onClick={toggleShowUserCfg} />
          </div>
          <div className="userInfoContainer closed" id="userInfoContainer">
            <div className="userInfo">
              <div className="userProfile">
                <img src={photoURL} alt={displayName} />
                <div className="displayInfo">
                  <hgroup>
                    <h2>Email</h2>
                    <h3>{email}</h3>
                  </hgroup>
                  <hgroup>
                    <h2>Nickname</h2>
                    <h3>{displayName}</h3>
                  </hgroup>
                </div>
              </div>
              <PrimaryButton
                action={toggleEditForm}
                value="Editar"
                id="editBtn"
                className="primaryConfigBtn"
              />
            </div>
          </div>
        </div>
      );
      
    //* Unfolded
    else
      return (
        <div className="userConfig" id="userConfig">
          <div className="exitImg">
            <img src={closeImg} alt="exit" onClick={toggleShowUserCfg} />
          </div>
          <div className="userInfoContainer" id="userInfoContainer">
            <div className="userInfo">
              <div className="userProfile">
                <img src={photoURL} alt={displayName} />
                <PrimaryButton
                  action={() => document.getElementById("fileInput").click()}
                  value="Cambiar imagen"
                  className="changeImgBtn"
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="fileInput"
                  onChange={props.storageImg} //! NEED SUPPORT
                />
              </div>
              <form id="editForm">
                <label htmlFor="newdisplayName">
                  <h2>Nickname</h2>
                  <input
                    type="text"
                    id="newdisplayName"
                    defaultValue={displayName}
                  />
                </label>
                <label htmlFor="newPassword">
                  <h2>Nueva contraseña</h2>
                  <input
                    type="text"
                    id="newPassword"
                    pattern="{6,}"
                    placeholder="6 caracteres minimo."
                  />
                </label>
                <label htmlFor="confirmPassword">
                  <h2>Confirmar contraseña</h2>
                  <input
                    type="text"
                    id="confirmPassword"
                    pattern="{6,}"
                    placeholder="6 caracteres minimo."
                  />
                </label>
                <div className="formButtons">
                  <SecondaryButton
                    action={toggleShowUserCfg}
                    value="Cancelar"
                  />
                  <PrimaryButton
                    action={saveNewUserInfo} //! NEED SUPPORT
                    value="Guardar"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default userConfig;
