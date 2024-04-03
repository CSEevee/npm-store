import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm  from '../login/LoginForm'; 
import ImageCarousel from './imageCarousel';

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white w-full py-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold">Scriptify</h1>
          {/* Navigation links */}
          <ul className="flex space-x-6">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
          {/* Shop Now button */}
          <Link to="/home" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </Link>
        </div>
      </nav>
      {/* Overlay to prevent interaction with other parts of the page */}
      {showLoginForm && (
        <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      )}

      {/* Login form popup */}
      {showLoginForm && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg z-20">
          <LoginForm onClose={() => setShowLoginForm(false)} />
        </div>
      )}

      <div className="mt-16 bg-cover bg-center h-[400px] w-full mb-8">
        <ImageCarousel />
      </div>

      {/* Trending packages section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Trending Packages</h2>
        {/* Display your trending packages here */}
      </div>

      {/* Scriptify's picks section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Scriptify's Picks</h2>
        {/* Display Scriptify's picks here */}
      </div>
    </div>
  );
};


export default LandingPage;
