  //Necesito conseguir primero el usuario, y luego mandar la actualización.
  import firebase from 'firebase/app'
  import getRegisterImg from './getRegisterImg'
  import login from './login'
  import 'firebase/auth'

  const app = firebase.app()

  const beginRegister = async () => {
    try {
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
  
      const res = auth.createUserWithEmailAndPassword(email, password)

      this.setState({ user: res.user }, () => {
        this.setStepTwo()
      })

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
  // database, 
  const endRegister = async () => {
    try {
      const { uid, email } = this.state.user
      const nickname = document.getElementById("nickname").value
      const photo = await getRegisterImg(uid)
      let userNewInfo = {}

      if (photo)
        userNewInfo = {
          displayName: nickname,
          photoURL: photo,
        }

      else
        userNewInfo = {
          displayName: nickname,
        }

      await state.user.updateProfile(userNewInfo)
      console.log(auth.currentUser)
      // debugger
      await app.database().ref("users").child(`${uid}`).set({
        nickname: this.auth.currentUser.displayName,
        photo: this.auth.currentUser.photoURL,
        online: true,
        email,
      })

      toastr.success("Registro completado.", "¡Listo!")
      login(true)
    } catch (error) {
      console.log(error)
      alert("Ocurrio un error inesperado, intente de nuevo en unos minutos.")
    }
  }

  export { beginRegister, endRegister} 