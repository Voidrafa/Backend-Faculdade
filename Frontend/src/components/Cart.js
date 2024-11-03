import React, { useEffect, useState } from 'react';

const Cart = ({ setCart }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch('http://localhost:5000/cart');
      const data = await response.json();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    const response = await fetch(`http://localhost:5000/cart/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Optionally fetch the updated cart
      const updatedCartResponse = await fetch('http://localhost:5000/cart');
      const updatedCartData = await updatedCartResponse.json();
      setCartItems(updatedCartData);
      setCart(updatedCartData); // Update the cart state in the parent component if needed
    } else {
      const errorData = await response.json();
      alert(errorData.error); // Display error message if the product wasn't in the cart
    }
  };

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
                <button className="btn btn-danger" onClick={() => removeFromCart(item.product_id)}>
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
