import React from 'react';

const Cart = ({ cart, setCart }) => {
  const removeFromCart = async (product_id) => {
    const response = await fetch(`http://localhost:5000/cart/${product_id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setCart(cart.filter(item => item.product_id !== product_id));
    }
  };

  return (
    <div>
      <h3>Seu Carrinho</h3>
      {cart.map(item => (
        <div key={item.product_id}>
          <p>{item.name} - {item.quantity} x {item.price} R$</p>
          <button onClick={() => removeFromCart(item.product_id)}>Remover</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
