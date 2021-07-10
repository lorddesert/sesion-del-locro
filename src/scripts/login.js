const login = async (currentUser = false) => {
    try {
      let ref = null;
      let authCurrentUser = this.auth.currentUser;

      if (currentUser) {
        ref = this.app.database().ref(`users/${this.auth.currentUser.uid}`);

        toastr.success("Sesion abierta detectada");

        this.setState(
          {
            showLogin: false,
            showRegister: false,
            user: {
              ref,
              ...authCurrentUser,
            },
          },
          () => {
            this.setContacts();
            this.setChatRooms();
            ref.child("online").onDisconnect().set(false);
          }
        );
      } else {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let { user } = await this.auth.signInWithEmailAndPassword(
          email,
          password
        );
        ref = this.app.database().ref(`users/${user.uid}`);

        this.setState(
          {
            showLogin: false,
            showRegister: false,
            user,
          },
          () => {
            this.setContacts();
            this.setChatRooms();
            ref.child("online").onDisconnect().set(false);
          }
        );
      }
    } catch (error) {
      let err = error;
      switch (error.code) {
        case "auth/invalid-email":
          toastr.error("El email es invalido.");
          break;

        case "auth/user-disabled":
          toastr.error("El email fue eliminado.");
          break;

        case "auth/user-not-found":
          toastr.error("El email no existe.");
          break;

        case "auth/wrong-password":
          toastr.error("Contraseña incorrecta");
          break;

        default:
          console.log(err);
          toastr.error("Un error ocurrio, intente de nuevo mas tarde.");
          break;
      }
    }
  };

  export default login;