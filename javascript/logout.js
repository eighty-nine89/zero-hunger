<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"></script>
import { getAuth, signOut, } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
const auth = getAuth();
const signOutBtn = document.getElementById("signoutbutton");
const signOutButtonPressed = (e) => {
    e.preventDefault();
    console.log("Sign out Button Pressed");
    const signOutButtonPressed = async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            console.log("User Signed Out Successfully!");
            window.location.href='login.html'
          } catch (error) {
            console.log(error.code);
          }
      };
  }
  
  signOutBtn.addEventListener("click", signOutButtonPressed);
  