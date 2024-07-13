class Geolocation {
  // on success
  successCallback(position) {
    let result = document.querySelector("#result"); // get the result div
    result.style.display = "block"; // show the result div

    let mapContainer = document.querySelector("#map"); // get the map container
    mapContainer.style.display = "block"; // show the map container
    const map = L.map("map").setView(
      [position.coords.latitude, position.coords.longitude],
      14.5
    );

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    ).addTo(map); // add the tiles to the map

    // adding map marker to the map
    L.marker([6.673164749452684, -1.5674784750938933]).addTo(map)
      .bindTooltip('College of Science, KNUST. (Food Bank)').openTooltip()
      .on("click", () => { window.open("COSfoodbank.html", "_blank"); });

    // adding map marker to the map
    L.marker([6.686903051808014, -1.566822804204397]).addTo(map)
      .bindTooltip('Community Center, KNUST. (Food Bank)').openTooltip()
      .on("click", () => { window.open("COMCENfoodbank.html", "_blank"); });

    // adding map marker to the map
    L.marker([6.675465398222645, -1.5667430679775691]).addTo(map)
      .bindTooltip('College of Agriculture, KNUST. (Food Bank)').openTooltip()
      .on("click", () => { window.open("AGRICfoodbank.html", "_blank"); });

    // adding map marker to the map
    L.marker([6.682683444352829, -1.5760730753687446]).addTo(map)
      .bindTooltip('Food Bank center, KNUST. (Food Bank)').openTooltip()
      .on("click", () => { window.open("FOODBANK.html", "_blank"); });

    // adding map marker to the map
    L.marker([6.6691961538699625, -1.5744769654935014]).addTo(map)
      .bindTooltip('Brunei Complex, KNUST. (Food Bank)').openTooltip()
      .on("click", () => { window.open("BRUNIEfoodbank.html", "_blank"); });

    // user default position on the map
    const marker = L.marker([
      position.coords.latitude,
      position.coords.longitude
    ]).addTo(map) // add a marker to the map
      .bindPopup('Your Current Location')
      .openPopup();
  }

  // on error
  errorCallback(error) {
    let result = document.querySelector("#result"); // get the result div
    result.style.display = "block"; // show the result div
    if (error.code == 1) { // if the user denied the request
      result.innerText = "You have not given permission to access your location.";
    } else if (error.code == 2) { // if the position is unavailable
      result.innerText = "Your location is unavailable.";
    } else if (error.code == 3) { // if the request times out
      result.innerText = "The request to get your location timed out.";
    } else { // if something else went wrong
      result.innerText = "An unknown error occurred.";
    }
  }

  showPosition() {
    if (navigator.geolocation) { // if the browser supports geolocation
      navigator.geolocation.getCurrentPosition(
        this.successCallback,
        this.errorCallback
      ); // get the user's location
      let result = document.querySelector("#result");
      result.style.display = "block";
    } else {
      alert('Your browser does not support geolocation'); // if the browser doesn't support geolocation
    }
  }
}

// Uncomment the following lines if you have a button to trigger showPosition
// const showPosition = document.querySelector("#showPosition");
// showPosition.addEventListener("click", function (e) {
//     e.preventDefault();
//     let result = document.querySelector("#result");
//     result.style.display = "block";
//     new Geolocation().showPosition(); // show the user's location
// });
