function callvalue() {
    var itemType = document.getElementById("item").value;
    var itemName = document.getElementById("itemtext").value;
    var manufacturedDate = document.getElementById("Manudate").value;
    var expiryDate = document.getElementById("Expdate").value;
    var pickupAddress = document.getElementById("address").value;
    var pickupDate = document.getElementById("pickdate").value;
    var pickupTime = document.getElementById("time").value;
    var imageUpload = document.getElementById("imageFile").value;
    var message = document.getElementById("message").value;

    document.write("DONATION" + "<br>");
    document.write(imageUpload + "<br>");
    document.write("Name of item " + itemName + "<br>");
    document.write("Type of item: " + itemType + "<br>");
    document.write("manufactured Date: " + manufacturedDate + "<br>");
    document.write("Expiry Date: " + expiryDate + "<br>");
    document.write("Pickup Address: " + pickupAddress + "<br>");
    document.write("pickup Date: " + pickupDate + ">br>");
    document.write("Pickup Time: " + pickupTime + "<br>");
    document.write("Addition Item Message: " + message);

  }