import { storage } from "firebase";

const storageImg = (e) => {
    const img = document.getElementById("fileInput").files[0];
    const ref = this.app
      .database()
      .ref(`users/${this.state.user.username}/photo`);
    let uploadTask = null;

    e.preventDefault();
    uploadTask = this.storage
      .child(`${this.state.user.username}/${img.name}`)
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