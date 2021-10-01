import React, { useCallback, useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'

import SecondaryButton from '../SecondaryButton/SecondaryButton'

const UserCfgPanel = () => {
  let context = useContext(GlobalContext);

  if('globalContext' in context) context = {...context.globalContext}

  const { auth } = context


    const toggleUserConfig = useCallback(() => {
        // this.toggleRotate()
        setTimeout(() => {
          const ref = document.getElementById("userConfig")
          ref.classList.toggle("toggleUserConfig")
        }, 150)
      })
    
      const disconnect = useCallback(() => {
        auth.signOut()
        window.location.reload()
      })
    
    return  <div className="userCfgPanel" id="userCfgPanel">
    <div className="panelOption config">
      <SecondaryButton
        value="Ajustes de usuario"
        action={toggleUserConfig}
      />
    </div>
    <div className="panelOption logOut">
      <SecondaryButton
        value="Cerrar Sesión"
        action={disconnect}
      />
    </div>
  </div>
}

export default UserCfgPanel