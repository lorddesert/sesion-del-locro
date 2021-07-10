  const saveNewUserInfo = (e) => {
    const newUserName = document.getElementById("newUserName").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const userRef = this.app
      .database()
      .ref(`users/${this.state.user.username}`);
    let newUserInfo = {};

    e.preventDefault();
    userRef
      .once("value")
      .then((snapshot) => {
        newUserInfo = { ...snapshot.val() };
        return newUserInfo;
      })
      .then((newUserInfo) => {
        if (newUserInfo.userName !== newUserName)
          newUserInfo.userName = newUserName;

        if (newPassword !== "")
          if (newPassword === confirmPassword)
            newUserInfo.password = newPassword;
          else {
            alert("¡Las contraseñas deben ser identicas!");
            return false;
          }
        else {
          alert("¡Las contraseñas deben ser identicas!");
          return false;
        }

        return newUserInfo;
      })
      .then((res) => {
        if (res)
          userRef
            .set(res)
            .then(
              () =>
                alert("Guardado correctamente!") /* only CLOSE the editForm */
            )
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  export default saveNewUserInfo;