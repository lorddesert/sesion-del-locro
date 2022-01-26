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

const Main = () => {
  const { auth, inChatRoom, receiver } = useContext(Context)

  const [ state, setState ] = useState({
    // State of Main to handle the view
    showLogin: true,
    stepTwo: false,
    showLoginOptions: false,
    showRegister: false,
    showChatRoom: false,
    showCRModal: false,
    chooseRender: "contacts",

    // Maybe
    // receiver: null,
    // inChatRoom: false,    
    // This is only needed for Contacts
    chatRooms: [],
    contacts: [],


    // Only for chat?
    chat: [],
  })

  const [ showLogin, setShowLogin ] = useState(true)

  const [ stepTwo, setStepTwo ] = useState(false)

  const [ showLoginOptions, setShowLoginOptions ] = useState(false)

  const [ showRegister, setShowRegister ] = useState(false)

  const [ showChatRoom, setShowChatRoom ] = useState(false)

  const [ showCRModal, setShowCRModal ] = useState(false)

  const [ chooseRender, setChooseRender ] = useState("contacts")

  const [ user, setUser ] = useState({
    username: '',
    displayName: '',
    photoURL: '',
  })

  return <GlobalContextProvider>
    <div className="Main">
      <div className="Main-content">

        {showLogin ? (
          <>
            <Login
              {...{
                setShowLogin,
                showLoginOptions,
                setShowRegister,
                setUser,
              }}

            // authUser={authUser}
            // register={register}
            />
          </>

       
        ) : inChatRoom ? (
          <>
            {showCRModal && (
              <CreateCRModal
                {...{
                  setShowCRModal,
                  handleInputFocus,
                  // createNewChatRoom,
                  // modifyChatRoom,
                  inChatRoom,
                }}

              />
            )}
            <UserConfig
            // saveNewUserInfo={saveNewUserInfo}
            // storageImg={storageImg}
            />
            {/* It will show the users connected in the chatRoom, EVEN I. */}
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
                receiver: {}, // * Custom hook,
                // sendChatRoomMsg,
                inChatRoom,
                stateMsg,
                receiverName: false,
              }
              }
            // chatRoom={state.chatRoom}
            // toggleModal={toggleModal}
            />
          </>

        ) : showRegister ? (
          <Register
            {...{
              // stepTwo,
              // setStepTwo,
              // beginRegister,
              // endRegister,
              setShowRegister,
              setShowLogin,
              // handleInputFocus,
              // storageImg,
              // beginRegister,
            }}
          />

        ) : (
          <>
            {state.showCRModal && (
              <CreateCRModal
              // toggleModal={toggleModal}
              // handleInputFocus={handleInputFocus}
              // createNewChatRoom={createNewChatRoom}
              // modifyChatRoom={modifyChatRoom}
              // inChatRoom={state.inChatRoom}
              />
            )}
            <UserConfig
            // saveNewUserInfo={saveNewUserInfo}
            // storageImg={storageImg}
            />
            <Contacts
            // contacts={state.contacts}
            // setChat={setChat}
            // enterChatRooms={enterChatRooms}
            // chooseRender={state.chooseRender}
            // chatRooms={state.chatRooms}
            // setChatRoom={setChatRoom}
            // toggleModal={toggleModal}
            />
            <Chat
            // user={auth.currentUser.displayName}
            // sendMsg={sendMsg}
            // receiver={state.receiver}
            // chat={state.chat}
            // sendChatRoomMsg={sendChatRoomMsg}
            // inChatRoom={state.inChatRoom}
            // sendMsg2={sendMsg2}
            // receiverPhoto={state.receiverPhoto}
            // receiverName={state.receiverName}
            // receiverNickname={state.receiverNickname}
            />
          </>
        )
        }
      </div>
    </div>
  </GlobalContextProvider>


}

export default Main