import React from 'react';
import ReactDOM from 'react-dom/client';
import Newsletter from './Newsletter';
import '../../../assets/newsletter-custom.css';

ReactDOM.createRoot(document.getElementById('newletter-root')!).render(
  <React.StrictMode>
    <Newsletter />
  </React.StrictMode>
);
