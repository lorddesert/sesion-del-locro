import React, { useState} from "react"
import { getAuth, updateProfile, updatePassword } from "firebase/auth"
import { ref, getDatabase, update } from "firebase/database"
import { uploadBytes, getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'

import "./userConfig.scss"
import PrimaryButton from "../PrimaryButton/PrimaryButton"

const userConfig = (props) => {
  
  const { displayName, uid, photoURL } = getAuth().currentUser
  const [ userImage, setUserImage ] = useState(photoURL)
  const [ file, setFile ] = useState({})

  const saveNewPassword = async (e) => {

    try {
      e.preventDefault()
  
      const newPassword = document.querySelector("#newPassword").value
      const confirmPassword = document.querySelector("#confirmPassword").value
  
      if (newPassword !== "")
        if (newPassword === confirmPassword) await updatePassword(getAuth().currentUser, newPassword)

        else {
          alert("¡Las contraseñas deben ser identicas!")
          return false
        }
  
      alert("Contraseña actualizada!")
      
    } catch (error) {
      
      alert('BAD!')
      console.log(error)
    }
    toggleShowUserCfg()
  }

  const saveProfileInfo = async (e) => {
    try {
      e.preventDefault()

      console.log(userImage)
      const newNickname = document.querySelector("#newdisplayName").value
      const userRef = ref(getDatabase(), `users/${uid}`)
      const userStorageRef = storageRef(getStorage(), `users/${uid}/${file.name}`)
      const response = await uploadBytes(userStorageRef, userImage)
      const imageURL = await getDownloadURL(response.ref)
      // Update the Database User

      console.log(imageURL)

      await update(userRef, { nickname: newNickname, photo: imageURL })

      // Update the Auth user 
      console.log('FLAG 2')
      await updateProfile(getAuth().currentUser, { displayName: newNickname, photoURL: imageURL  })

      alert("Usuario actualizado!")
    } catch (error) {
      alert("BAD!")
      console.log(error)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    document.getElementById("fileInput").click()
  }

  const changePreviewImage = () => {
    const file = document.querySelector('#fileInput').files[0]

    let fileURL = URL.createObjectURL(file)

    setFile(file)
    setUserImage(fileURL)
  }

  return (
    <div className="userConfig" id="userConfig">
      <form id="editForm">
        <h2 style={{marginBottom: '1.5em'}}>Profile</h2>
        <div className="profileImage">
          <img src={userImage} alt='imagen de perfil'/>
          <PrimaryButton
            action={handleClick}
            value="Cambiar imagen"
            className="changeImgBtn"
          />
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          id="fileInput"
          onChange={changePreviewImage}
        />

        <p>Nickname</p>
        <label htmlFor="newdisplayName">
          <input type="text" id="newdisplayName" defaultValue={displayName} />
        </label>
        <div className="formButtons">
          <PrimaryButton
            action={saveProfileInfo}
            value="Guardar"
          />
        </div>
      </form>

      <form id="editForm">
        <h2>Security</h2>
        <p>Nueva contraseña</p>
        <label htmlFor="newPassword">
          <input
            type="password"
            id="newPassword"
            pattern="{6,}"
            placeholder="6 caracteres minimo."
          />
        </label>
        <p>Confirmar contraseña</p>
        <label htmlFor="confirmPassword">
          <input
            type="password"
            id="confirmPassword"
            pattern="{6,}"
            placeholder="6 caracteres minimo."
          />
        </label>
        <div className="formButtons">
          <PrimaryButton
            action={saveNewPassword} //! NEED SUPPORT
            value="Guardar"
          />
        </div>
      </form>
    </div>
  )
}

export default userConfig
