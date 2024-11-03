import React, { useEffect, useState } from 'react';

const Cart = ({ setCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch('http://localhost:5000/cart');
      const data = await response.json();
      setCartItems(data);
      calculateTotal(data); // Calculate total price on fetch
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const removeFromCart = async (productId) => {
    const response = await fetch(`http://localhost:5000/cart/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedCartResponse = await fetch('http://localhost:5000/cart');
      const updatedCartData = await updatedCartResponse.json();
      setCartItems(updatedCartData);
      setCart(updatedCartData);
      calculateTotal(updatedCartData); // Recalculate total after removing item
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity below 1

    const response = await fetch(`http://localhost:5000/cart/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });

    if (response.ok) {
      const updatedCartResponse = await fetch('http://localhost:5000/cart');
      const updatedCartData = await updatedCartResponse.json();
      setCartItems(updatedCartData);
      setCart(updatedCartData);
      calculateTotal(updatedCartData); // Recalculate total after updating quantity
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  };

  const handleCheckout = async () => {
    // Clear the cart on checkout
    const response = await fetch('http://localhost:5000/cart', {
      method: 'DELETE',
    });

    if (response.ok) {
      setCartItems([]); // Clear cart items in state
      setCart([]); // Clear cart in parent component
      setTotalPrice(0); // Reset total price
      alert("Pagamento realizado com sucesso!");
    } else {
      const errorData = await response.json();
      alert(errorData.error);
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
                <p className="card-text">Preço: {item.price} <span>R$</span></p>
                <p className="card-text">Quantidade: {item.quantity}</p>
                <div className="d-flex">
                  <button className="btn btn-secondary me-2" onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>
                    -
                  </button>
                  <button className="btn btn-secondary me-2" onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>
                    +
                  </button>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item.product_id)}>
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h3>Total: {totalPrice} <span>R$</span></h3>
      <button className="btn btn-success" onClick={handleCheckout}>
        Pagar
      </button>
    </div>
  );
};

export default Cart;
