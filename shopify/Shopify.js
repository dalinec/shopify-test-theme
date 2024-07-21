import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: 'a9d992ab7829e869062a27b4fd8d236f',
  apiSecretKey: 'e186e974c292fae7fe9f39ef03d6b2b5',
  scopes: ['read_products,write_customers'],
  hostName: 'ff3b-178-143-191-212.ngrok-free.app',
  hostScheme: 'https',
});

export const shopifyAuthBegin = (req, res, next) => {
  shopify.auth.begin({
    shop: 'test3-storepls.myshopify.com',
    callbackPath: '/auth/shopify/callback',
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });
};
export const shopifyAuthCallback = async (req, res, next) => {
  const callbackResponse = await shopify.auth.callback({
    shop: 'test3-storepls.myshopify.com',
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });
  const { session } = callbackResponse;
  const restClient = new shopify.clients.Rest({ session });
  const response = await restClient.get({
    path: 'products',
  });
  res.send({ status: response });
};

export const createCustomer = async (req, res, next) => {
  try {
    const { session } = req; // Assuming the session is available in the request
    const restClient = new shopify.clients.Rest({ session });

    const customerData = {
      customer: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+15142546011',
        verified_email: true,
        addresses: [
          {
            address1: '123 Oak St',
            city: 'Ottawa',
            province: 'ON',
            phone: '555-1212',
            zip: '123 ABC',
            last_name: 'Doe',
            first_name: 'John',
            country: 'CA',
          },
        ],
      },
    };

    const response = await restClient.post({
      path: 'customers',
      data: customerData,
      type: 'application/json',
    });

    res.send({ status: 'Customer created', customer: response.body.customer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).send('Error creating customer');
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const { session } = req; // Assuming the session is available in the request
    const restClient = new shopify.clients.Rest({ session });

    const customerId = req.params.id; // Assuming customer ID is passed as a URL parameter

    const response = await restClient.get({
      path: `customers/${customerId}`,
    });

    res.send({ status: 'Customer details', customer: response.body.customer });
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).send('Error fetching customer');
  }
};

// Session is built by the OAuth process

const customer = new shopify.rest.Customer({ session: session });
customer.first_name = 'Steve';
customer.last_name = 'Lastnameson';
customer.email = 'steve.lastnameson@example.com';
customer.phone = '+15142546011';
customer.verified_email = true;
customer.addresses = [
  {
    address1: '123 Oak St',
    city: 'Ottawa',
    province: 'ON',
    phone: '555-1212',
    zip: '123 ABC',
    last_name: 'Lastnameson',
    first_name: 'Mother',
    country: 'CA',
  },
];
await customer.save({
  update: true,
});
