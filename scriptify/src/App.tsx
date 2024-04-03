// import React from 'react';
import { Button } from "./components/ui/button"
// import  LoginForm from "./components/login/LoginForm.tsx"
// import Dashboard  from './components/home/home.tsx';
import { BrowserRouter as Router } from 'react-router-dom'
import { DataTableDemo } from "./components/home/home.tsx";

function App() {

  return (
  <Router>
    <div>
      <DataTableDemo/>
      <Button>Test</Button>
    </div>
    </Router>
  )
}

export default App
