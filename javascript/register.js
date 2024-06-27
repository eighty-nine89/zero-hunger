// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1sfm2XVLTPEbIVeUAVMvXRV_tFTUyffw",
  authDomain: "zerohunger-f7417.firebaseapp.com",
  projectId: "zerohunger-f7417",
  storageBucket: "zerohunger-f7417.appspot.com",
  messagingSenderId: "477597863714",
  appId: "1:477597863714:web:187661d1cb7c74ed1b1f7b",
  measurementId: "G-7B1F5S2TJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//submit field from signup document
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault() //prevent page from refreshing upon clicking submit button

  //input fields from signup document
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("Account successfully created...")
      window.location.href = "login.html"; //redirecting to login page
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Firebase: Error(Auth, Invalid-user inputs/email/password).")
      // ..
    });

})