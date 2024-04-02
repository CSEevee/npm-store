import React from 'react';

const ShoppingCart = ({ packages }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {/* map over the list of packages in the user's shopping cart and display */}
        {packages.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;