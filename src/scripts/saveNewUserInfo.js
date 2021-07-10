  import firebase from 'firebase/app'

  const app = firebase.app()

  const saveNewUserInfo = async (e) => {
    const newUserName = document.getElementById("newUserName").value
    const newPassword = document.getElementById("newPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const userRef = app
      .database()
      .ref(`users/${this.state.user.username}`)
    let newUserInfo = {}

    e.preventDefault()

    const snapshot = await userRef.once("value")
    newUserInfo =  await { ...snapshot.val() }

    if (newUserInfo.userName !== newUserName)
      newUserInfo.userName = newUserName

      if (newPassword !== "")
        if (newPassword === confirmPassword)
          newUserInfo.password = newPassword
        else {
          alert("¡Las contraseñas deben ser identicas!")
          return false
        }
      else {
        alert("¡Las contraseñas deben ser identicas!")
        return false
      }
      if (newUserInfo)
        await userRef.set(newUserInfo)

  }

  export default saveNewUserInfo