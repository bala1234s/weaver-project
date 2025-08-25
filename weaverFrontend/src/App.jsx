
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter, Link } from 'react-router-dom';

import Home from './Home';
// import Login from './Login';
import Login from './Login'
import Signup from './Signup';
import CustomerHome from './customer/CustomerHome';
import WeaverHome from './weaver/WeaverHome';
import Navbar from './Navbar';
import CustomerDress from './customer/CustomerDress';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer routes */}
        <Route path="/customer" element={<CustomerHome />}>
          <Route path="customDress" element={<CustomerDress />} />
        </Route>

        <Route path="/weaver" element={<WeaverHome />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
