import React from 'react';
import ReactDOM from 'react-dom/client';
import AddToCartButton from './AddToCartButton';

const addToCartRoot = document.getElementById('add-to-cart-button');

if (addToCartRoot) {
  const variantId = addToCartRoot.dataset.variantId;
  const productTitle = addToCartRoot.dataset.productTitle;

  if (variantId && productTitle) {
    ReactDOM.createRoot(addToCartRoot!).render(
      <React.StrictMode>
        <AddToCartButton
          variantId={Number.parseInt(variantId)}
          productTitle={productTitle}
        />
      </React.StrictMode>
    );
  }
}
