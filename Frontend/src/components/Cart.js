// src/components/Cart.js

import React from 'react';
import axios from 'axios';

const Cart = ({ cartItems, setCartItems }) => {
    const handleRemove = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/${productId}`);
            setCartItems(cartItems.filter(item => item.product_id !== productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-muted">Your cart is empty.</p>
                ) : (
                    <ul className="list-group">
                        {cartItems.map(item => (
                            <li key={item.product_id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{item.name}</h5>
                                    <small>Quantity: {item.quantity}</small>
                                </div>
                                <button 
                                    onClick={() => handleRemove(item.product_id)} 
                                    className="btn btn-danger btn-sm"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Cart;
