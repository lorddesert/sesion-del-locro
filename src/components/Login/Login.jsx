import React, { useContext, useEffect } from "react"
import toastr from "toastr" // ? Should we use this?


import "./Login.scss"
import locro from "./resources/locro.jpg"
import logo from "./resources/logo.svg"
import GlobalContext from "../../context/GlobalContext"

import PrimaryButton from "../PrimaryButton/PrimaryButton"
import SecondaryButton from "../SecondaryButton/SecondaryButton"

const Login = props => {
  toastr.options = {
    positionClass: "toast-bottom-right",
    timeOut: 2000,
    progressBar: true,
    closeButton: true,
    newestOnTop: false,
  }
  const { globalContext, setGlobalContext }  = useContext(GlobalContext)
  const { app, auth, user } = globalContext

  const logIn = async (currentUser = false) => {
    try {
      
      let ref = null
      let authCurrentUser = auth.currentUser

      if (currentUser) {
        ref = app.database().ref(`users/${auth.currentUser.uid}`)

        toastr.success("Sesion abierta detectada")
        
        ref.child("online").onDisconnect().set(false)

        props.setUser({ ref, ...authCurrentUser })
        props.setShowLogin(false)
        props.setShowRegister(false)

      } else {
        // let email = document.getElementById("email").value
        // let password = document.getElementById("password").value

        let email = "alan.nocetto@hotmail.com"
        let password = "asd123"

        let { user } = await auth.signInWithEmailAndPassword(
          email,
          password
        )
        ref = app.database().ref(`users/${user.uid}`)

        props.setUser(user)
        setGlobalContext({
          ...globalContext,
          user: {
            ref, ...authCurrentUser 
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
          toastr.error("El email es invalido.")
          break

        case "auth/user-disabled":
          toastr.error("El email fue eliminado.")
          break

        case "auth/user-not-found":
          toastr.error("El email no existe.")
          break

        case "auth/wrong-password":
          toastr.error("Contraseña incorrecta")
          break

        default:
          console.log(err)
          toastr.error("Un error ocurrio, intente de nuevo mas tarde.")
          break
      }
    }
  }

  const handleEvent = (e) => {
    e.persist()
    e.preventDefault()
    e.target.classList.toggle("focusedInput")
  }
const myFn = () => {
  setGlobalContext({user: "Magnificent Richard-man!!!!"})
}

useEffect(() => {
  // console.log('THE USEEEEEEEEEEEER', user)
}, [user])
    return (
      <div className="Login">
        <div className="Login-img" />
        <div className="Login-form-container">
          <div className="Logo">
            <h1>Sesion del Locro</h1>
            {/* <img src='https://frasesparami.com/wp-content/uploads/2019/09/imagenes-bonitas.jpg' alt='logo' width='50px' /> */}
            <img src={logo} alt="logo" width="50px" />
          </div>
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
                action={() => setShowRegister(true)}
              />
            </div>
          </form>
        </div>
      </div>
    )
}

export default Login
