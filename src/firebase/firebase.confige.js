// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkkfcsW82LDAls1LsmKCdkXOKJzy830lw",
  authDomain: "user-email-password-auth-54994.firebaseapp.com",
  projectId: "user-email-password-auth-54994",
  storageBucket: "user-email-password-auth-54994.appspot.com",
  messagingSenderId: "315273988474",
  appId: "1:315273988474:web:715f59ef8ec935f75aaec3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth