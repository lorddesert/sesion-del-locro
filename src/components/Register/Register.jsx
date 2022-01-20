import React, { useContext, useState } from "react"
import { getAuth, updateCurrentUser, updateProfile } from 'firebase/auth'
import { getDatabase, ref, child, set } from 'firebase/database'

// Components
import Context from '../../context/GlobalContext'
import "./Register.scss"
import PrimaryButton from "../PrimaryButton/PrimaryButton"
import SecondaryButton from "../SecondaryButton/SecondaryButton"

const Register = props => {
  const { globalContext } = useContext(Context)
  const { app, auth, logIn, user } = globalContext
  const [ img, setImg ] = useState("")

  const getRegisterImg = (e) => {
    e.persist()
    e.preventDefault()

    const img = document.getElementById("fileInput").files[ 0 ]
    const imgURL = URL.createObjectURL(img)
    setImg(imgURL)
  }

  const register = async (e) => {
    try {
      e.preventDefault()
      const email = document.querySelector("#email").value
      const nickname = document.querySelector("#nickname").value
      const password = document.querySelector("#password").value

      // !LOADING
      await auth.createUserWithEmailAndPassword(getAuth(), email, password)

      
      await updateProfile(getAuth().currentUser, {
        displayName: nickname
      })

      console.log('%c Update displayName', 'color: aquagreen; background: black; border-radius: 7px;');
      
      const currentUserRef = child(ref(getDatabase(), "users"), `${getAuth().currentUser.uid}`)
      console.log('%c Current user ref', 'color: aquagreen; background: black; border-radius: 7px;');

      // return
      await set(currentUserRef, {
        nickname: nickname,
        online: true,
        email,
      })
      console.log('FLAG 2 Set new user info');
      console.log(getAuth().currentUser);
      

      alert('SU! ccesfully registered. Welcome!')

      logIn(true)
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          alert("La contraeña es muy debil, intente usando otra.")
          break
        case "auth/email-already-in-use":
          alert("El email ya esta en uso, pruebe con otro.")
          break
        case "auth/operation-not-allowed":
          alert("Email o contraseña no validos.")
          break

        default:
          alert("Un error ha ocurrido, intente en unos minutos.")
          console.log(error)
          break
      }
    }
  }

  const handleInputFocus = (e) => {
    e.persist();
    e.preventDefault();
    e.target.classList.toggle("focusedInput");
  };

  const returnToLogin = (e) => {
    e.preventDefault()
    props.setShowRegister(false)
    props.setShowLogin(true)
  }

  return (
    <>
      <main className="Register">

        <form className="RegisterForm">
          <section>
            <label htmlFor="email">
              <h2>Email</h2>
              <input
                type="email"
                id="email"
                name="email"
                required
                onFocus={handleInputFocus}
                onBlur={handleInputFocus}
                placeholder="example@hotmail.com"
                autoComplete="email"
              />
            </label>
          </section>

          <section>
            <label htmlFor="nickname">
              <h2>Nickname</h2>
              <input
                type="text"
                id="nickname"
                name="nickname"
                required
                onFocus={handleInputFocus}
                onBlur={handleInputFocus}
                placeholder="Imma'getchu"
                />
            </label>
          </section>

          <section>
            <label htmlFor="password">
              <h2>Contraseña</h2>
              <input
                type="password"
                id="password"
                name="password"
                required
                onFocus={handleInputFocus}
                onBlur={handleInputFocus}
                autoComplete="password"
              />
            </label>
          </section>

          <div style={{ display: "flex", placeItems: "center" }}>
            {img && <img src={img} alt="imagen del usuario" />}
            <PrimaryButton
              action={(e) => {
                e.persist()
                e.preventDefault()
                document.querySelector("#fileInput").click()
              }}
              value="Cambiar imagen"
              className="changeImgBtn"
            />
            <input
              type="file"
              style={{ display: "none" }}
              id="fileInput"
              onChange={getRegisterImg}
            />
          </div>
          <PrimaryButton value="Listo" action={register} /> {/*//! End register */}

          <p>
          <strong>ó</strong>
        </p>
        <SecondaryButton
          id="logIn"
          value="Inicia Sesión"
          action={returnToLogin}
        />
        </form>
      </main>
    </>
  )
}

export default Register
