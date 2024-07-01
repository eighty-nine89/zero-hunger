// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurationip
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

//getting ref to database services
const db = getDatabase(app);

document.getElementById("submit").addEventListener('click', function (e) {
    e.preventDefault();
    set(ref(db, `user/'${document.getElementById("foodbank-center").value}/${document.getElementById("food-name").value}`),
        {
            foodName: document.getElementById("food-name").value,
            foodType: document.getElementById("food-type").value,
            manufacturedDate: document.getElementById("mandate").value,
            expiryDate: document.getElementById("expdate").value,
            foodbankCenter: document.getElementById("foodbank-center").value,
            donateDate: document.getElementById("donatedate").value,
            donateTime: document.getElementById("time").value,
            foodPicture: document.getElementById("imageFile").value,
            foodMessage: document.getElementById("message").value,
            donorName: document.getElementById("donor-name").value,
            donorPhonenumber: document.getElementById("donor-phone").value,
            donorEmail: document.getElementById("donor-email").value,
        });

    alert("Thank you for successful food donation. Please proceed to donate food to the center. ",)
})

const analytics = getAnalytics(app);
