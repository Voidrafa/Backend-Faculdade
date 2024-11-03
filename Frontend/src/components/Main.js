// src/components/Main.js

import React from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

const Main = ({ addToCart, cartItems, setCartItems }) => (
    <main>
        <div className="row">
            <div className="col-md-8">
                <ProductList addToCart={addToCart} />
            </div>
            <div className="col-md-4">
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
            </div>
        </div>
    </main>
);

export default Main;
