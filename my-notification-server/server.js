const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { Vonage } = require('@vonage/server-sdk');

const app = express();
const port = 5502;

app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipientdb-d69a4-default-rtdb.firebaseio.com"
});

const vonage = new Vonage({
  apiKey: '748a04e8',
  apiSecret: '5KAYz7T3TxsNWc5w'
});

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Handle preflight requests
app.options('/confirmRequest', (req, res) => {
  res.sendStatus(200);
});

app.post('/confirmRequest', async (req, res) => {
  const { referenceNumber, name, phone, foodName, foodBankCenter } = req.body;

  const currentDateTime = new Date();
  const pickupTime = new Date(currentDateTime.getTime() + 2 * 60 * 60 * 1000);
  const formattedPickupTime = pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const message = `Hello ${name}, your request for ${foodName} at ${foodBankCenter} has been confirmed. Your reference number is ${referenceNumber}. Please pick up your food by ${formattedPickupTime}.`;

  // Ensure phone number is in the correct format for Ghana without removing the leading zero
  let formattedPhone = phone;
  if (!formattedPhone.startsWith('+233')) {
    formattedPhone = '+233' + phone.slice(1);
  }

  console.log(`Sending SMS to: ${formattedPhone}`);
  console.log(`Message: ${message}`);

  try {
    // Send SMS via Vonage
    const from = 'VonageAPI'; // You can change this to a valid Sender ID
    const to = formattedPhone;
    vonage.sms.send({to, from, text: message}, (err, responseData) => {
      if (err) {
        console.error('Error sending SMS:', err);
        res.status(500).send({ error: 'Error confirming request.' });
      } else {
        if (responseData.messages[0].status === "0") {
          console.log('Message sent successfully.');
          // Store the request in Firebase
          admin.database().ref('confirmedRequests/' + referenceNumber).set(req.body);
          res.status(200).send({ message: 'Request confirmed and stored in Firebase.' });
        } else {
          console.error(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          res.status(500).send({ error: 'Error confirming request.' });
        }
      }
    });
  } catch (error) {
    console.error('Error confirming request:', error);
    res.status(500).send({ error: 'Error confirming request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
