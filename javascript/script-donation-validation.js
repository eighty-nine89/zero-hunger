// Firebase configuration
var firebaseConfig = {
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
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var storage = firebase.storage();
  
  document.getElementById('donation-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var isValid = validateForm();
    if (isValid) {
      storeData();
    }
  });
  
  function validateForm() {
    var isValid = true;
    var fields = [
      'food-name', 'food-type', 'mandate', 'expdate',
      'foodbank-center', 'donatedate', 'time', 'imageFile',
      'message', 'donor-name', 'donor-phone', 'donor-email'
    ];
  
    fields.forEach(function (field) {
      var element = document.getElementById(field);
      var errorElement = document.getElementById(field + '-error');
      if (element.value.trim() === '') {
        element.classList.add('is-invalid');
        errorElement.textContent = 'This field is required';
        isValid = false;
      } else {
        element.classList.remove('is-invalid');
        errorElement.textContent = '';
      }
    });
  
    return isValid;
  }
  
  function storeData() {
    var formData = new FormData(document.getElementById('donation-form'));
    var imageFile = formData.get('imageFile');
  
    // Store image in Firebase Storage
    var storageRef = storage.ref('images/' + imageFile.name);
    var uploadTask = storageRef.put(imageFile);
  
    uploadTask.on('state_changed', function(snapshot) {
      // Handle upload progress
    }, function(error) {
      // Handle upload error
      console.error('Image upload failed:', error);
    }, function() {
      // Get download URL and store form data in Firestore
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        db.collection('donations').add({
          foodName: formData.get('food-name'),
          foodType: formData.get('food-type'),
          manufactureDate: formData.get('mandate'),
          expiryDate: formData.get('expdate'),
          foodbankCenter: formData.get('foodbank-center'),
          donationDate: formData.get('donatedate'),
          donationTime: formData.get('time'),
          imageUrl: downloadURL,
          message: formData.get('message'),
          donorName: formData.get('donor-name'),
          donorPhone: formData.get('donor-phone'),
          donorEmail: formData.get('donor-email')
        }).then(function() {
          alert('Donation successfully submitted');
          document.getElementById('donation-form').reset();
        }).catch(function(error) {
          console.error('Error storing data:', error);
        });
      });
    });
  }
  