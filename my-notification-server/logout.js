const firebaseConfig = {
    // Your Firebase configuration details
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function logout() {
    firebase.auth().signOut().then(() => {
      // Redirect to login page
      window.location.href = 'login.html';
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  }

