import React, { useContext } from "react";
import { update, getDatabase, ref } from 'firebase/database'
import './ChatRoomConfig.scss'

// Components
import Context from '../../context/GlobalContext'
import PrimaryButton from "../PrimaryButton/PrimaryButton";

export default function ChatRoomConfig({ showCRConfig, setShowCRConfig }) {

  const { globalContext } = useContext(Context)
  const { receiver } = globalContext

  async function saveChatRoomData(e) {
    try {
      e.preventDefault()
  
      const name = document.querySelector('#name').value
      const stateMsg = document.querySelector('#stateMsg').value
      const minDiceValue = parseInt(document.querySelector('#minDiceValue').value)
      const maxDiceValue = parseInt(document.querySelector('#maxDiceValue').value)
  
      if (maxDiceValue === 0) return false

      if (minDiceValue > maxDiceValue) return false

  
      await update(ref(getDatabase(), 'chatRooms/la creta'), {name, minDiceValue, maxDiceValue, stateMsg})
  
      alert('Sala de chat actualizada!')
    } catch (error) {
      alert('Ha ocurrido un error, intenta de nuevo mas tarde!')
      console.log(error)
    }
  }

  function toggleShowCRConfig() {
    setShowCRConfig(!showCRConfig)
  }
  return (
    <div className="ChatRoomConfig">
      <i className="exit fas fa-times-circle" onClick={toggleShowCRConfig}></i>
      <form onSubmit={saveChatRoomData}>
        <p>Nombre de la sala</p>
        <label htmlFor="name">
          <input type="text" name="name" defaultValue={receiver.name} id="name" />
        </label>

        <p>Mensaje de estado</p>
        <label htmlFor="stateMsg">
          <input type="text" name="name" defaultValue={receiver.stateMsg} id="stateMsg" />
        </label>

        <p>Tirada minima de dados</p>
        <label htmlFor="minDiceValue">
          <input type="number" name="minDiceValue" defaultValue={receiver.minDiceValue} id="minDiceValue" />
        </label>

        <p>Tirada maxima de dados</p>
        <label htmlFor="maxDiceValue">
          <input type="number" name="maxDiceValue" defaultValue={receiver.maxDiceValue} id="maxDiceValue"/>
        </label>

        <PrimaryButton 
          value="Guardar"
        />
      </form>
    </div>
  );
}
