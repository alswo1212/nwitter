import {initializeApp} from "firebase/app"
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1urwLH-oOFB9hWSJAEi_fnzkdsfVRKoI",
    authDomain: "nwitter-718d2.firebaseapp.com",
    projectId: "nwitter-718d2",
    storageBucket: "nwitter-718d2.appspot.com",
    messagingSenderId: "361981743207",
    appId: "1:361981743207:web:1e8abd81dc6c12ec4544c2",
    measurementId: "G-CRF6PTWFJQ",

    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    // appId: process.env.REACT_APP_APP_ID,
    // measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };
  

//export default firebase.initializeApp(firebaseConfig);
const firebase = initializeApp(firebaseConfig);
export const authService = getAuth(firebase);
export const firebaseInstance = firebase;
export const dbService = getFirestore();
export const storageService = getStorage();