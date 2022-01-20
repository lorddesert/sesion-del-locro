import React, { useContext, useEffect } from "react"
import { getAuth } from 'firebase/auth'
import { ref, getDatabase, onDisconnect, child } from 'firebase/database'

import "./Login.scss"
import locro from "./resources/locro.jpg"
import logo from "./resources/logo.svg"
import GlobalContext from "../../context/GlobalContext"

import PrimaryButton from "../PrimaryButton/PrimaryButton"
import SecondaryButton from "../SecondaryButton/SecondaryButton"

const Login = props => {
  const { globalContext, setGlobalContext }  = useContext(GlobalContext)
  const { app, auth, user } = globalContext
  
  useEffect(() => {
    // console.log('THE USEEEEEEEEEEEER', user)

    if (getAuth().currentUser) logIn(true)
    else console.log(getAuth().currentUser);


    setGlobalContext({
      ...globalContext,
      logIn,
    })
  }, [user])

  const logIn = async (currentUser = false) => {
    try {
      const db = getDatabase()
      
      let userRef = null
      let authCurrentUser = getAuth().currentUser

      if (currentUser) {
        // Old
        // ref = ref(db, `users/${authCurrentUser.uid}`)
        // ref.child("online").onDisconnect().set(false)
                
        onDisconnect(child(ref(db, 'users'), `${authCurrentUser.uid}/online`)).set(false)
        
        props.setUser({...authCurrentUser })
        setGlobalContext({
          ...globalContext,
          user: {
            ref: ref(db, `users/${authCurrentUser.uid}`), ...authCurrentUser 
          }
        })
        props.setShowLogin(false)
        props.setShowRegister(false)
        
      } else {
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        
        let { user } = await auth.signInWithEmailAndPassword( getAuth(), email, password )
        
        userRef = ref(db, `users/${user.uid}`)

        props.setUser(user)
        setGlobalContext({
          ...globalContext,
          user: {
            userRef, ...authCurrentUser 
          }
        })
        props.setShowLogin(false)
        props.setShowRegister(false)
        /* 
          setUser
        */
        // setState(
        //   {
        //     showLogin: false,
        //     showRegister: false,
        //     user,
        //   },
        //   () => {
        //     setContacts()
        //     setChatRooms()
        //     ref.child("online").onDisconnect().set(false)
        //   }
        // )
      }
    } catch (error) {
      let err = error
      switch (error.code) {
        case "auth/invalid-email":
          alert("El email es invalido.")
          break

        case "auth/user-disabled":
          alert("El email fue eliminado.")
          break

        case "auth/user-not-found":
          alert("El email no existe.")
          break

        case "auth/wrong-password":
          alert("Contraseña incorrecta")
          break

        default:
          console.log(err)
          alert("Un error ocurrio, intente de nuevo mas tarde.")
          break
      }
    }
  }

  const handleEvent = (e) => {
    e.persist()
    e.preventDefault()
    e.target.classList.toggle("focusedInput")
  }

  const showRegister = (e) => {
    e.preventDefault()
    props.setShowLogin(false)
    props.setShowRegister(true)
  }
    return (
      <div className="Login">
        <div className="Login-img" />
        <div className="Login-form-container">
          <form className="Login-form">
            <span id="errorMsg"></span>
            <label htmlFor="email">
              <h2>Email</h2>
              <input
                type="text"
                id="email"
                onFocus={handleEvent}
                onBlur={handleEvent}
                placeholder="example@hotmail.com"
              />
            </label>
            <label htmlFor="password">
              <h2>Contraseña</h2>
              <input
                type="password"
                id="password"
                onFocus={handleEvent}
                onBlur={handleEvent}
              />
            </label>
            <label htmlFor="submit">
              <PrimaryButton
                id="submit"
                value="Iniciar Sesión"
                action={(e) => {
                  e.preventDefault()
                  logIn()
                  // myFn()
                }}
              />
            </label>
            <div className="links">
              <SecondaryButton
                id="link"
                value="¿No tienes una cuenta?"
                action={showRegister}
              />
            </div>
          </form>
        </div>
      </div>
    )
}

export default Login
