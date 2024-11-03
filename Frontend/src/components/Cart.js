import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch('http://localhost:5000/cart');
      const data = await response.json();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Carrinho de Compras</h2>
      <div className="row">
        {cartItems.map(item => (
          <div className="col-md-4 mb-4" key={item.product_id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Quantidade: {item.quantity}</p>
                <p className="card-text">Preço: {item.price} <span>R$</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
