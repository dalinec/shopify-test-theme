import express from 'express';
import {
  shopifyAuthBegin,
  shopifyAuthCallback,
  createCustomer,
  getCustomer,
} from './shopify/Shopify.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json()); // To parse JSON bodies

app.get('', (req, res) => {
  res.send('Hello world');
});

app.get('/auth/shopify', shopifyAuthBegin);
app.get('/auth/shopify/callback', shopifyAuthCallback);
app.post('/customer', createCustomer); // Endpoint to create a new customer
app.get('/customer/:id', getCustomer); // Endpoint to get customer details

app.listen(8000, () => {
  console.log('App is running on port 8000.');
});
