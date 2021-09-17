import { storage } from "firebase";
import firebase from 'firebase/app'

const app = firebase.app()

const storageImg = async (e) => {
    const img = document.getElementById("fileInput").files[0];
    const ref = app
      .database()
      .ref(`users/${state.user.username}/photo`);

    let uploadTask = null;

    e.preventDefault();

    uploadTask = storage
      .child(`${state.user.username}/${img.name}`)
      .put(img);
      
    uploadTask.on("state_changed", null, null, () => {
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then((imgURL) => {
          ref.set(imgURL);

          return imgURL;
        })
        .then((imgURL) =>
          this.setState((state) => ({
            ...state,
            user: {
              ...state.user,
              photo: imgURL,
            },
          }))
        )
        .catch((err) => console.log(err));
    });
  };

  export default storageImg