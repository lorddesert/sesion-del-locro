import React, { useContext, useEffect, useState } from "react"
import { getAuth } from 'firebase/auth'
import { ref, getDatabase, onDisconnect, child } from 'firebase/database'

import "./Login.scss"
import locro from "./resources/locro.jpg"
import logo from "./resources/logo.svg"
import GlobalContext from "../../context/GlobalContext"

import PrimaryButton from "../PrimaryButton/PrimaryButton"
import SecondaryButton from "../SecondaryButton/SecondaryButton"
import Login3js from '../3js'

const Login = props => {
  const { globalContext, setGlobalContext }  = useContext(GlobalContext)
  const { app, auth, user } = globalContext
  const submitBtn = document.querySelector('#submit')

  const [submitBtnValue, setSubmitBtnValue] = useState('GO!')

  
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
      setSubmitBtnValue('…')
      document.querySelector('.PrimaryButton').classList.toggle('waiting')

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
        setSubmitBtnValue('✔')
        setTimeout(() => {
          
          props.setShowLogin(false)
          props.setShowRegister(false)
        }, 1000)
        
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

        document.querySelector('.PrimaryButton').classList.toggle('success')
        setSubmitBtnValue('✔')
        setTimeout(() => {
          
          props.setShowLogin(false)
          props.setShowRegister(false)
        }, 2000)
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

      document.querySelector('.PrimaryButton').classList.toggle('waiting')
      document.querySelector('.PrimaryButton').classList.toggle('error')
      document.querySelector('.submitBtn').classList.toggle('error')

      setSubmitBtnValue('ERR!')

      setTimeout(() => {
        document.querySelector('.PrimaryButton').classList.toggle('error')

        document.querySelector('.submitBtn').classList.toggle('error')
        setSubmitBtnValue('GO!')
      }, 2500)      


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

        case "auth/internal-error":
          alert("Error interno del servicio")

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
        {/* <div className="Login-img" /> */}
        <Login3js />
        <div className="Login-form-container">
          <form className="Login-form">
            <span id="errorMsg"></span>
            <label htmlFor="email">
              <h2>Email</h2>
              <input
                type="text"
                id="email"
                autoComplete="true"
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
                autoComplete="true"
                autoSave="true"
                onFocus={handleEvent}
                onBlur={handleEvent}
              />
            </label>
            <label htmlFor="submit">
              <PrimaryButton
                id="submit"
                value={submitBtnValue}
                className='submitBtn'
                action={(e) => {
                  e.preventDefault()
                  logIn()
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
