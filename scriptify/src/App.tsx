// import React from 'react';
// import { Button } from "./components/ui/button"
import  LoginForm from "./components/login/LoginForm.tsx"
// import Dashboard  from './components/home/home.tsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { DataTableDemo } from "./components/home/home.tsx";
import { Checkout } from "./components/shoppingCart/checkout/checkout.jsx";


function App() {

  return (
 <div>   
  <Router>
    <Routes>
        <Route path="/home" element={ <DataTableDemo/> }/>
        <Route path="/login" element={ <LoginForm/> }/>
        {/* <Route path="/cart" element={ <Cart/> }/> */}
        {/* <Route path="/checkout" element={ <Checkout/> }/> */}
        <Route path="/" element = { <Navigate to = "/login" />} />
      </Routes>
    </Router>
  </div>
  )
}

export default App
