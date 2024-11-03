import React from 'react';
import axios from 'axios';

const Cart = ({ cartItems, setCartItems }) => {
    const handleRemove = async (productId) => {
        try {
            await axios.delete("http://localhost:5000/cart/${productId}");
            setCartItems(cartItems.filter(item => item.id !== productId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;