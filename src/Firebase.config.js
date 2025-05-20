import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1ZW3PPvuh_ZfOOknGGUIstGGGJFX0kmY",
  authDomain: "gardening-community-e9b5a.firebaseapp.com",
  projectId: "gardening-community-e9b5a",
  storageBucket: "gardening-community-e9b5a.appspot.com", 
  messagingSenderId: "410828872881",
  appId: "1:410828872881:web:95be4f593de9e7d14ed690",
  measurementId: "G-9VBJ04E908"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
