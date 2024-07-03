import React from 'react';
import { Link } from 'react-router-dom';
import Home from './pages/Home.js'
import MyRouter from './router/index.js';
import Navbar from './components/Navbar.js';



function App() {
  return (
    <div>
    
    <Navbar />

    <MyRouter />
     
    </div>
  );
}

export default App;
