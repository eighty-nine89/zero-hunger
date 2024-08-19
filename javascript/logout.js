import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

    // Firebase configuration
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
    const auth = getAuth(app);

    // Get the user details and display the username
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = ref(db, `users/${uid}`);

        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById("username").textContent = userData.fullName || "User";
          } else {
            console.log("No user data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      } else {
        // Redirect to login page if no user is signed in
        window.location.href = "login.html";
      }
    });

    document.getElementById("signoutbtn").addEventListener("click", () => {
      signOut(auth).then(() => {
        // Clear session storage (or local storage if you store session tokens there)
        sessionStorage.clear();
        localStorage.clear(); // If you store tokens in local storage, clear this as well

        // Prevent back navigation
        if (history.pushState) {
          history.pushState(null, null, window.location.href);
          window.onpopstate = function () {
            history.go(1);
          };
        }

        // Redirect to the login page
        window.location.href = "login.html";
      }).catch((error) => {
        console.error("Sign-out error: ", error);
      });
    });