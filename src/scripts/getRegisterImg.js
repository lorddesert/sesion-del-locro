// import firebase from 'firebase/app'
import "firebase/storage"

async function getRegisterImg(uid) {
    try {
      const img = document.getElementById("fileInput").files[0];
      if (!img) {
        return false;
      } else {
        let newUserStorage = storage.child(`${uid}/${img.name}`);
        let uploadTask = null;
        let imgURL = null;

        uploadTask = await newUserStorage.put(img);
        imgURL = await newUserStorage.getDownloadURL();

        return imgURL;
      }
    } catch (error) {
      console.log(error);
      console.log(uploadTask, imgURL);
      alert("Ha ocurrido un error inesperado.");
    }
  }