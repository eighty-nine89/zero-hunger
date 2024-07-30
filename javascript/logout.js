<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"></script>
import { getAuth, signOut, } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
document.getElementById("signoutbtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    // Clear the session and prevent back navigation
    if (history.pushState) {
      history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        history.go(1);
      };
    }
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Sign-out error: ", error);
  });
});

