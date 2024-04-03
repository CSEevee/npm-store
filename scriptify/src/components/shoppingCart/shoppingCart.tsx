import React from 'react';
import CartItems from './cartItems';
import Checkout from './checkout/checkout';

const ShoppingCart = () => {
  return (
    <div className="container mx-auto px-8 py-12">
      <h2 className='text-5xl font-bold mb-4'>Shopping Cart</h2>
      {/* Component 1: list of all packages in cart */}
      <CartItems/>
      {/* Component 2: generate NPM script and button to save to db 
      - include a copy button
      */}
      <Checkout />
    </div>
  );
};

export default ShoppingCart;