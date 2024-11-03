// src/App.js

import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import axios from 'axios';

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (productId) => {
        try {
            const response = await axios.post('http://localhost:5000/cart', { productId });
            setCartItems([...cartItems, response.data]);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <div>
            <h1>My Shop</h1>
            <ProductList addToCart={addToCart} />
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </div>
    );
};

export default App;