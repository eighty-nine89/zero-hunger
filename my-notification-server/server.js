const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const axios = require('axios');

const app = express();
const port = 5502;

app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipientdb-d69a4-default-rtdb.firebaseio.com"
});

const INFOPBIP_API_KEY = '0511e843c836a4715509f9058242735f-b54b1085-0a13-4569-bef1-16a809ff21a5'; // Infobip API key

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

  const message = `Hello ${name}, your request for ${foodName} at ${foodBankCenter} has been confirmed. Your reference number is ${referenceNumber}. Please pick up your food within the next 2 hours.`;

  // Ensure phone number is in the correct format for Ghana
  let formattedPhone = phone;
  if (!formattedPhone.startsWith('+233')) {
    formattedPhone = '+233' + phone.replace(/^0/, ''); // Remove leading zero if present
  }

  const myHeaders = {
    'Authorization': `App ${INFOPBIP_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const raw = JSON.stringify({
    messages: [
      {
        destinations: [{ to: formattedPhone }],
        from: "ServiceSMS",
        text: message
      }
    ]
  });

  try {
    // Send SMS via Infobip
    const response = await axios.post('https://vvnmvr.api.infobip.com/sms/2/text/advanced', raw, {
      headers: myHeaders
    });

    console.log('Infobip response:', response.data);

    if (response.data.messages && response.data.messages[0].status.groupId === 1) {
      // Store the request in Firebase
      await admin.database().ref('confirmedRequests/' + referenceNumber).set(req.body);
      res.status(200).send({ message: 'Request confirmed and stored in Firebase.' });
    } else {
      throw new Error('SMS not sent successfully');
    }
  } catch (error) {
    console.error('Error confirming request:', error);
    res.status(500).send({ error: 'Error confirming request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
