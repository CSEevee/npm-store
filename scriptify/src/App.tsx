// import React from 'react';
//import { Button } from "./components/ui/button"
// import Dashboard  from './components/home/home.tsx';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { DataTableDemo } from "./components/home/home.tsx";
import LoginForm from "./components/login/LoginForm.tsx";
import { useNavigate } from "react-router-dom"

function App() {
const navigate = useNavigate();
  return (
 <div>   
  <Router>
    <Routes>
      <Route path="/home" element={<DataTableDemo />} />
      <Route path="/" element={<LoginForm />} />
    </Routes>
  </Router>
</div>
  )
}

export default App
