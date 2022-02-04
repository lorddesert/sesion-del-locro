import React, { useState, useContext, useEffect } from "react";
import { GlobalContextProvider } from '../../context/GlobalContext'

import "./Main.scss";
import Context from '../../context/GlobalContext'

/*Components */
import Chat from "../Chat/Chat";
import Contacts from "../Contacts/Contacts";
import Login from "../Login/Login";
import UserConfig from "../userConfig/userConfig";
import Register from "../Register/Register";
import CreateCRModal from "../CreateCRModal/CreateCRModal";
import Navigation from "../Navigation/Navigation";
import ChatRoomConfig from '../ChatRoomConfig/ChatRoomConfig'


const Main = () => {
  const { auth, inChatRoom, receiver } = useContext(Context)

  // const [ state, setState ] = useState({
  //   // State of Main to handle the view
  //   showLogin: true,
  //   stepTwo: false,
  //   showLoginOptions: false,
  //   showRegister: false,
  //   showChatRoom: false,
  //   showCRModal: false,
  //   chooseRender: "contacts",

  //   // Maybe
  //   // receiver: null,
  //   // inChatRoom: false,    
  //   // This is only needed for Contacts
  //   chatRooms: [],
  //   contacts: [],


  //   // Only for chat?
  //   chat: [],
  // })

  const [ showLogin, setShowLogin ] = useState(true)

  const [ stepTwo, setStepTwo ] = useState(false)

  const [ showLoginOptions, setShowLoginOptions ] = useState(false)

  const [ showRegister, setShowRegister ] = useState(false)

  const [ showConfig, setShowConfig] = useState(false)

  const [ showCRConfig, setShowCRConfig] = useState(false)

  const [ showChatRoom, setShowChatRoom ] = useState(false)

  const [ showCRModal, setShowCRModal ] = useState(false)

  const [ chooseRender, setChooseRender ] = useState("contacts")

  const [ user, setUser ] = useState({
    username: '',
    displayName: '',
    photoURL: '',
  })


  if (showLogin) return <GlobalContextProvider>
      <div className="Main">
        <div className="Main-content">
            <Login
              {...{
                setShowLogin,
                showLoginOptions,
                setShowRegister,
                setUser,
              }}
            />
        </div>
      </div>
    </GlobalContextProvider>

  if (showRegister) return <GlobalContextProvider>
    <div className="Main">
      <div className="Main-content">
        <Register
          {...{
            setShowRegister,
            setShowLogin,
          }}
        />
      </div>
    </div>
  </GlobalContextProvider>

  if (inChatRoom) return <GlobalContextProvider>
    <div className="Main">
      <div className="Main-content">
        <CreateCRModal
          {...{
            setShowCRModal,
            handleInputFocus,
            inChatRoom,
          }}
        />
        <UserConfig/>
        <Navigation setShowConfig={setShowConfig}/>
        <Contacts
          {...{
            setChat,
            setChatRoom,
            setShowCRModal,
          }}
        />
        <Chat
          {...{
            user: auth.currentUser.displayName,
            receiver: {},
            inChatRoom,
            stateMsg,
            receiverName: false,
            setShowCRConfig,
            showCRConfig
          }
          }
        />
      </div>
    </div>
  </GlobalContextProvider>

  if (showConfig) return <GlobalContextProvider>
    <div className="Main">
      <div className="Main-content">
        <Navigation {...{showConfig, setShowConfig}}/>
        <UserConfig />
      </div>
    </div>
  </GlobalContextProvider>

  if (showCRConfig) return <GlobalContextProvider>
    <div className="Main">
      <div className="Main-content">
        <Navigation {...{showConfig, setShowConfig}}/>
        <ChatRoomConfig 
          {...{
            showCRConfig,
            setShowCRConfig
          }}
        />
      </div>
    </div>
  </GlobalContextProvider>

  return <GlobalContextProvider>
    <div className="Main">
      <div className="Main-content">
        <Navigation {...{showConfig, setShowConfig}}/>
        <Contacts/>
        <Chat {...{showCRConfig, setShowCRConfig}}/>
      </div>
    </div>
  </GlobalContextProvider>

}

export default Main