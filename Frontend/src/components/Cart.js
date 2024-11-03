// src/components/Cart.js

import React from 'react';
import axios from 'axios';

const Cart = ({ cartItems, setCartItems }) => {
    const handleRemove = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/${productId}`);
            // Update cart items locally after removing the item
            setCartItems(cartItems.filter(item => item.product_id !== productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.product_id}>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleRemove(item.product_id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
