// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1sfm2XVLTPEbIVeUAVMvXRV_tFTUyffw",
    authDomain: "zerohunger-f7417.firebaseapp.com",
    databaseURL: "https://zerohunger-f7417-default-rtdb.firebaseio.com",
    projectId: "zerohunger-f7417",
    storageBucket: "zerohunger-f7417.appspot.com",
    messagingSenderId: "477597863714",
    appId: "1:477597863714:web:187661d1cb7c74ed1b1f7b",
    measurementId: "G-7B1F5S2TJB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("submit").addEventListener('click', function (e) {
    e.preventDefault();

    // Perform validation
    const foodName = document.getElementById("food-name").value.trim();
    const foodType = document.getElementById("food-type").value.trim();
    const manufacturedDate = document.getElementById("mandate").value.trim();
    const expiryDate = document.getElementById("expdate").value.trim();
    const foodbankCenter = document.getElementById("foodbank-center").value.trim();
    const donateDate = document.getElementById("donatedate").value.trim();
    const donateTime = document.getElementById("time").value.trim();
    const foodPicture = document.getElementById("imageFile").value.trim();
    const foodMessage = document.getElementById("message").value.trim();
    const donorName = document.getElementById("donor-name").value.trim();
    const donorPhonenumber = document.getElementById("donor-phone").value.trim();
    const donorEmail = document.getElementById("donor-email").value.trim();

    // Check if any required fields are empty
    if (
        !foodName || !foodType || !manufacturedDate || !expiryDate || !foodbankCenter ||
        !donateDate || !donateTime || !donorName || !donorPhonenumber || !donorEmail
    ) {
        alert("Please fill out all required fields.");
        return;
    }

    // Assuming all validations passed, proceed to set data in Firebase
    set(ref(db, `user/${foodbankCenter}/${donorName}`), {
        foodName: foodName,
        foodType: foodType,
        manufacturedDate: manufacturedDate,
        expiryDate: expiryDate,
        foodbankCenter: foodbankCenter,
        donateDate: donateDate,
        donateTime: donateTime,
        foodPicture: foodPicture,
        foodMessage: foodMessage,
        donorName: donorName,
        donorPhonenumber: donorPhonenumber,
        donorEmail: donorEmail,
    });

    alert("Thank you for your food donation. Please proceed to donate food to the center.");
});

const analytics = getAnalytics(app);
