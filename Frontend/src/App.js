// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Products from './components/Products'; // Import the Products component
import Footer from './components/Footer'; // Import the Footer component
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar /> {/* Include the Navbar here */}
        <Routes>
          <Route path="/" element={<ProductList products={products} setCart={setCart} />} />
          <Route path="/product/:id" element={<ProductDetail setCart={setCart} />} />
          <Route path="/cart" element={<Cart setCart={setCart} />} />
          <Route path="/products" element={<Products />} /> {/* New route for Products */}
        </Routes>
        <Footer /> {/* Include the Footer here */}
      </div>
    </Router>
  );
};

export default App;
