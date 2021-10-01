import React, { useState, useCallback, useContext } from "react";
import GlobalContext from '../../context/GlobalContext'

import "./userConfig.scss";
import closeImg from "./resources/close.svg";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

const userConfig = props => {

  const [edit, setEdit] = useState(false)

  const toggleShowUserCfg = useCallback((e) => {
    const userCfgRef = document.getElementById("userConfig");
    let userInfoContainer = document.getElementById("userInfoContainer");
    e.preventDefault();

    if (edit) toggleEditForm();

    if (!userInfoContainer.classList.contains("closed"))
      userInfoContainer.classList.toggle("closed");

    userCfgRef.classList.toggle("toggleUserConfig");
  }, []);

  const toggleEditForm = useCallback(() => {s
    let userInfoContainer = document.getElementById("userInfoContainer");

    userInfoContainer.cslassList.toggle("closed");

    setEdit(!edit)
  }, []);

  let context = useContext(GlobalContext);

  if('globalContext' in context) context = {...context.globalContext}

  // const { photoURL, displayName, email } = context.auth.currentUser

    if (!edit)
      return (
        <div className="userConfig" id="userConfig">
          <div className="exitImg">
            <img src={closeImg} alt="exit" onClick={toggleShowUserCfg} />
          </div>
          <div className="userInfoContainer closed" id="userInfoContainer">
            <div className="userInfo">
              <div className="userProfile">
                {/* <img src={photoURL ? photoURL : ""} alt={displayName} /> */}
                <div className="displayInfo">
                  <hgroup>
                    <h2>Email</h2>
                    {/* <h3>{email}</h3> */}
                  </hgroup>
                  <hgroup>
                    <h2>Nickname</h2>
                    {/* <h3>{displayName}</h3> */}
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
    else
      return (
        <div className="userConfig" id="userConfig">
          <div className="userInfoContainer" id="userInfoContainer">
            <div className="userInfo">
              <div className="userProfile">
                {/* <img src={photoURL ? photoURL : ""} alt={displayName} /> */}
                <PrimaryButton
                  action={() => document.getElementById("fileInput").click()}
                  value="Cambiar imagen"
                  className="changeImgBtn"
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="fileInput"
                  onChange={props.storageImg}
                />
              </div>
              <form id="editForm">
                <label htmlFor="newdisplayName">
                  <h2>Nickname</h2>
                  <input
                    type="text"
                    id="newdisplayName"
                    defaultValue={user.displayName}
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
                    action={props.saveNewUserInfo}
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
