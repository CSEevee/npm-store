import React, { useState } from 'react'
import SlideOut from "@ijsto/react-slideout"

// need to map over the list of the packages in the user's shopping cart and display those items
// create checkout button
// create a slide out component that will display the checkout form
// create a submit button that will send the user's information to the backend
// create a cancel button that will close the slide out

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    // send user information to the bank end
    event.preventDefault();
    console.log('Submitted!');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>
      <SlideOut isOpen={isOpen} onClose={handleClose}>
        <div>
          <h2>Checkout Form</h2>
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </SlideOut>
    </div>
  );
};

export default Checkout;
