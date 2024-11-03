import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
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
      <div className="App">
        <header className="bg-primary text-white text-center py-4">
          <h1>Geek Store</h1>
        </header>
        <Routes>
          <Route path="/" element={<ProductList products={products} setCart={setCart} />} />
          <Route path="/product/:id" element={<ProductDetail setCart={setCart} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <footer className="bg-dark text-white text-center py-3">
          <p>&copy; 2024 GeekHunter. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
