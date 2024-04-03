import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';

const Checkout = () => {
  const [command, setCommand] = useState('');
  const [copied, setCopied] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  }

  //use navigator.clipboard to copy text!
  const handleCopy = () => {
    navigator.clipboard.writeText(command)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
       })
      .catch((error) => {
        console.error('Error copying command to clipboard: ', error);
      });
  };

  //will update with the actual items from lcoal storage
  useEffect(() => {
    const storedCommand = localStorage.getItem('checkoutCommand');
    setCommand(storedCommand);
  }, []);

  //function to store command in previous checkouts
  const sendCommandToDatabase = async () => {
    try {
      const response = await fetch('/server/database/previouscheckout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send command to database');
      }
  
      const data = await response.json();
      console.log('Command sent to database:', data);
     } catch (error) {
      console.error('Error sending command to database: ', error);
    }
  };
  

 

  return (
    // <div className="container mx-auto px-8 py-12">
    //   <h2 className="text-3xl font-bold mb-4">Checkout</h2>
    //   <div className="relative border rounded-md p-4 mb-4">
    //     <p className="text-lg font-semibold mb-4">Paste the command below:</p>
    //     <div className="border border-gray-300 rounded-md p-4 h-48 flex items-center justify-center">
    //       <p>{command}</p>
    //     </div>
    //     <Button onClick={handleCopy} className="absolute top-2 right-2 flex items-center">
    //       <span className="mr-1">Copy Command</span>
    //       {copied && <span className="absolute top-full right-0 mt-2 bg-gray-800 text-white px-2 py-1 rounded-md">Copied to clipboard</span>}
    //       <svg className="h-4 w-4 ml-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
    //         <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v1h2a1 1 0 011 1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a1 1 0 011-1h2V4zm10 0H6v1h8V4z" clipRule="evenodd"/>
    //       </svg>
    //     </Button>
    //   </div>
    //   <p className="text-lg font-semibold">Estimated Cost: $0.00</p>
    // </div>
    <div className="container mx-auto px-8 py-12">
      {showCart ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">Cart</h2>
          <Button onClick={handleCheckout}>Checkout</Button>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">Checkout</h2>
          <div className="relative border rounded-md p-4 mb-4">
            <p className="text-lg font-semibold mb-4">Paste the command below:</p>
            <div className="border border-gray-300 rounded-md p-4 h-48 flex items-center justify-center">
              <p>{command}</p>
            </div>
            <Button onClick={handleCopy} className="absolute top-2 right-2 flex items-center">
              <span className="mr-1">Copy Command</span>
              {copied && <span className="absolute top-full right-0 mt-2 bg-gray-800 text-white px-2 py-1 rounded-md">Copied to clipboard</span>}
              <svg className="h-4 w-4 ml-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v1h2a1 1 0 011 1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a1 1 0 011-1h2V4zm10 0H6v1h8V4z" clipRule="evenodd"/>
              </svg>
            </Button>
          </div>
          <p className="text-lg font-semibold">Estimated Cost: $0.00</p>
        </div>
      )}
    </div>
  );
  
}

export default Checkout;
