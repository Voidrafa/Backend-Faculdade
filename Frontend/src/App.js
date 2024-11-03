import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
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
    <div className="App">
      <header className="bg-primary text-white text-center py-4">
        <h1>Geek Store</h1>
      </header>
      <ProductList products={products} cart={cart} setCart={setCart} />
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2024 GeekHunter. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
