// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
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
      // Send verification email
      sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Verification link sent to your email to verify your account!");
        });

      // Update user profile with full name
      updateProfile(auth.currentUser, {
        displayName: fullName
      }).then(() => {
        // Signed up and profile updated
        alert("Account successfully created, verification link sent to your email.");
        window.location.href = "login.html"; // Redirecting to login page
      }).catch((error) => {
        alert("Failed to update profile: " + error.message);
      });

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorCode);
    });
});
