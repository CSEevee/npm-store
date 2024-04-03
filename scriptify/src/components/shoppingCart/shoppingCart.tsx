import React from 'react';
import CartItems from './cartItems';
import Checkout from './checkout/checkout';

const ShoppingCart = () => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {/* Component 1: list of all packages in cart */}
      <CartItems/>
      <ul>
        {/* map over the list of packages in the user's shopping cart and display */}
        {/* {packages.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))} */}
      </ul>
      {/* Component 2: generate NPM script and button to save to db 
      - include a copy button
      */}
      <Checkout />

    </div>
  );
};

export default ShoppingCart;