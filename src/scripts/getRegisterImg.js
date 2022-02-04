// import firebase from 'firebase/app'
import { ref, uploadBytes, getStorage } from "firebase/storage"
import  { getAuth } from 'firebase/auth'

async function getRegisterImg(uid) {
    try {

      const img = document.getElementById("fileInput").files[0];

      if (!img) return false
      
      const file = URL.createObjectURL(img)
      const destiny = ref(getStorage(), `users/${getAuth().currentUser.uid}/${file.name}`)
      const response = await uploadBytes(destiny, file)

        return imgURL;
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error inesperado.");
    }
  }