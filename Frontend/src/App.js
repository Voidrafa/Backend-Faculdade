// src/App.js

import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import axios from 'axios';

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    // Function to load cart items from the API
    const loadCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cart');
            setCartItems(response.data); // Set the cart items from the API response
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    // Fetch cart items when the component mounts
    useEffect(() => {
        loadCartItems();
    }, []);

    // Function to add item to cart
    const addToCart = async (productId, quantity) => {
        try {
            await axios.post('http://localhost:5000/cart', { product_id: productId, quantity });
            loadCartItems(); // Reload cart items after adding a new item
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
