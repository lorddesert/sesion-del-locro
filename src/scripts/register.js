  //Necesito conseguir primero el usuario, y luego mandar la actualización.
  const beginRegister = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({ user: res.user }, () => {
          this.setStepTwo();
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            alert("La contraeña es muy debil, intente usando otra.");
            break;
          case "auth/email-already-in-use":
            alert("El email ya esta en uso, pruebe con otro.");
            break;
          case "auth/operation-not-allowed":
            alert("Email o contraseña no validos.");
            break;

          default:
            alert("Un error ha ocurrido, intente en unos minutos.");
            console.log(error);
            break;
        }
      });
  };
  const endRegister = async () => {
    try {
      const { uid, email } = this.state.user;
      const nickname = document.getElementById("nickname").value;
      const photo = await this.getRegisterImg(uid);
      let userNewInfo = {};

      if (photo)
        userNewInfo = {
          displayName: nickname,
          photoURL: photo,
        };
      else
        userNewInfo = {
          displayName: nickname,
        };

      await this.state.user.updateProfile(userNewInfo);
      console.log(this.auth.currentUser);
      debugger;
      await this.app.database().ref("users").child(`${uid}`).set({
        nickname: this.auth.currentUser.displayName,
        photo: this.auth.currentUser.photoURL,
        online: true,
        email,
      });

      toastr.success("Registro completado.", "¡Listo!");
      this.login(true);
    } catch (error) {
      console.log(error);
      alert("Ocurrio un error inesperado, intente de nuevo en unos minutos.");
    }
  };

  export { beginRegister, endRegister} 