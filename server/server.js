const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const SHOPIFY_API_KEY = 'a9d992ab7829e869062a27b4fd8d236f';
const SHOPIFY_API_PASSWORD = 'e186e974c292fae7fe9f39ef03d6b2b5';
const SHOPIFY_STORE_URL = 'test3-storepls.myshopify.com/';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../assets')));

app.post('/api/create-customer', async (req, res) => {
  const { name, email } = req.body;

  try {
    const response = await axios.post(
      `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_STORE_URL}/admin/api/2024-07/customers.json`,
      {
        customer: {
          first_name: name,
          email: email,
          verified_email: true,
          accepts_marketing: true,
        },
      }
    );

    if (response.data.customer) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Failed to create customer.' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
