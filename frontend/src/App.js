import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './landing_page/home/HomePage';  // HomePage already includes NavBar
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/pages/About';
import Products from './components/pages/Products';
import Pricing from './components/pages/Pricing';
import Support from './components/pages/Support';
import TradingView from './components/trading/TradingView';  // Add this import
import Orders from './components/orders/Orders';
import MyOrders from './components/trading/MyOrders';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trading" element={<TradingView />} />  {/* Add this route */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </div>
  );
}

export default App;
