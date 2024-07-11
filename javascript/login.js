// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
// Sign in with google
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
// forgot password 
let ForgotPassLabel = document.getElementById('forgotpasslabel');
// google sign in button id
login.addEventListener('click', (e) => {
    // signInWithRedirect(auth, provider);

    // getRedirectResult(auth)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access Google APIs.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;

    //         // The signed-in user info.
    //         const user = result.user;
    //         // IdP data available using getAdditionalUserInfo(result)
    //         // ...
    //     }).catch((error) => {
    //         // Handle Errors here. 
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //     });

    // Sign in with popup google 
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    window.location.href = "index.html";
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})

const analytics = getAnalytics(app);
//submit field from signup document using sign in with emial and password
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault() //prevent page from refreshing upon clicking submit button

    //input fields from signup document
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user.uid;
            alert("Log in successful...")
            window.location.href = "index.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            alert(errorMessage);
            console.log(errorCode);
            console.log(errorCode);
            // ..
        });

})

let ForgotPassword = ()=>{
  sendPasswordResetEmail(auth, email.value)
  .then(()=>{
    alert("A Password Reset has been sent to your email");
  })
  .catch((error)=>{
    console.log(error.code);
    console.log(error.message);
  })
}

ForgotPassLabel.addEventListener('click', ForgotPassword);