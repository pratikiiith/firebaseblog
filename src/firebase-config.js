import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRARV3htv75MDhnI--N874iXyzPLEpo_8",
  authDomain: "friendlychat-53530.firebaseapp.com",
  databaseURL: "https://friendlychat-53530-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "friendlychat-53530",
  storageBucket: "friendlychat-53530.appspot.com",
  messagingSenderId: "384669647506",
  appId: "1:384669647506:web:2731e8caa94ff6896bdc4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();