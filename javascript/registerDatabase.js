// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1sfm2XVLTPEbIVeUAVMvXRV_tFTUyffw",
  authDomain: "zerohunger-f7417.firebaseapp.com",
  databaseURL: "https://zerohungersignupdb-default-rtdb.firebaseio.com/",
  projectId: "zerohunger-f7417",
  storageBucket: "zerohunger-f7417.appspot.com",
  messagingSenderId: "477597863714",
  appId: "1:477597863714:web:ac0651553a4bfa331b1f7b",
  measurementId: "G-JVSS08EENM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Getting ref to database services
const db = getDatabase(app);

// Function to validate the full name
function validateFullName(fullName) {
  if (!fullName || fullName.trim() === '') {
    return "Full name cannot be empty";
  }

  // Add more validation checks if needed
  // e.g., regex for valid name format

  return null; // No errors
}

// Function to validate email
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return "Please enter a valid email address";
  }
  return null; // No errors
}

// Function to validate password
function validatePassword(password) {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!password || !passwordPattern.test(password)) {
    return "Password must be at least 6 characters long and contain at least one letter and one number";
  }
  return null; // No errors
}

document.getElementById("submit").addEventListener('click', function (e) {
  e.preventDefault();

  // Get input values
  const fullName = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validate inputs
  const fullNameError = validateFullName(fullName);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (fullNameError || emailError || passwordError) {
    if (fullNameError) alert(fullNameError);
    if (emailError) alert(emailError);
    if (passwordError) alert(passwordError);
    return; // Do not proceed if any input is invalid
  }

  // Store data in Firebase Realtime Database
  set(ref(db, 'user/' + fullName), {
    fullname: fullName,
    email: email,
    password: password,
  })
  .then(() => {
    alert("Account successfully created...");
    window.location.href = "login.html"; // Redirecting to login page
  })
  .catch((error) => {
    alert("Error storing data: " + error.message);
    console.error(error);
  });
});

const analytics = getAnalytics(app);
