// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

// Function to validate the full name
function validateFullName(fullName) {
  if (!fullName || fullName.trim() === '') {
    return "Full name cannot be empty";
  }

  // Add more validation checks if needed
  // e.g., regex for valid name format

  return null; // No errors
}

// Submit event listener
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent page from refreshing upon clicking submit button

  // Input fields from signup document
  const fullName = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate full name
  const fullNameError = validateFullName(fullName);
  if (fullNameError) {
    alert(fullNameError);
    return; // Do not proceed if full name is invalid
  }

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //sending verification  link to current user email
      sendEmailVerification(auth.currentUser)
      .then(() =>{
        alert("Verification link sent to your email to verify your account!")
      });

      // Signed up
      const user = userCredential.user.uid;
      alert("Account successfully created...");
      window.location.href = "login.html"; // Redirecting to login page
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorCode);
      console.log(errorCode);
    });
});
