// import React from 'react';
// import { Button } from "./components/ui/button"
import  LoginForm from "./components/login/LoginForm.tsx"
// import Dashboard  from './components/home/home.tsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { DataTableDemo } from "./components/home/home.tsx";
import ShoppingCart from "./components/shoppingCart/shoppingCart.tsx";
import LandingPage from './components/landingPage/landingPage.tsx';

function App() {

  return (
 <div>   
  <Router>
    <Routes>
        <Route path="/home" element={ <DataTableDemo/> }/>
        <Route path="/login" element={ <LoginForm/> }/>
        <Route path="/cart" element={ <ShoppingCart/> }/>
        <Route path="/" element={ <LandingPage /> } />
        {/* <Route path="/" element = { <Navigate to = "/login" />} /> */}
      </Routes>
    </Router>
  </div>
  )
}

export default App
