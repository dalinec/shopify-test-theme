const AddToCartButton = ({
  variantId,
  productTitle,
}: {
  variantId: number;
  productTitle: string;
}) => {
  const addToCart = async () => {
    const cartDrawer: any = document.querySelector('cart-drawer');
    const addToCartRequest = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            quantity: 1,
            id: variantId,
          },
        ],
        sections: cartDrawer
          .getSectionsToRender()
          .map((section: any) => section.id),
      }),
    });
    const res = await addToCartRequest.json();
    console.log(res);
    cartDrawer.renderContents(res);

    const root = document.querySelector('#add-to-cart-button');
    root?.dispatchEvent(
      new CustomEvent('product-added', {
        detail: {
          id: variantId,
        },
      })
    );
  };
  return (
    <div>
      <button onClick={addToCart}>{productTitle}</button>
      <form
        method='POST'
        action='/account'
        id='create_customer'
        accept-charset='UTF-8'
      >
        <label htmlFor='firstName'>First name</label>
        <input type='text' id='firstName' />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

export default AddToCartButton;
