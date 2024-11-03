import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = ({ setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:5000/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const response = await fetch('http://localhost:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: product._id }),
    });
    
    if (response.ok) {
      // Optionally fetch the updated cart
      const cartResponse = await fetch('http://localhost:5000/cart');
      const cartData = await cartResponse.json();
      setCart(cartData);
      
      // Redirect to the cart page
      navigate('/cart');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} <span>R$</span></p>
      <button className="btn btn-primary" onClick={addToCart}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductDetail;
