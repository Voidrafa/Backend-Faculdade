// src/components/ProductList.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo192.png'; // Import the logo

const ProductList = ({ products, setCart }) => {
  const fetchCartItems = async () => {
    const response = await fetch('http://localhost:5000/cart');
    const data = await response.json();
    setCart(data); // Update the cart state with fetched data
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="section-title text-center">Produtos Selecionados</h3>
      <div className="row">
        {products.map(product => (
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card">
              <img src={logo} className="card-img-top" alt={product.name} /> {/* Use the imported logo */}
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                    {product.name}
                  </Link>
                </h5>
                <p className="rate">&#9733;&#9733;&#9733;&#9733;&#9734;</p>
                <p className="card-text">{product.price} <span>R$</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
