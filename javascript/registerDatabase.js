// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
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

//getting ref to database services
const db = getDatabase(app);

document.getElementById("submit").addEventListener('click', function (e) {
  e.preventDefault();
  set(ref(db, 'user/' + document.getElementById("fullname").value),
    {
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    });

})

const analytics = getAnalytics(app);
