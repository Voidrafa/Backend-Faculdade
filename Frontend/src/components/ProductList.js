// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({}); // Track quantities for each product

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleQuantityChange = (productId, value) => {
        setQuantities({
            ...quantities,
            [productId]: value
        });
    };

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                        />
                        <button onClick={() => addToCart(product._id, quantities[product._id] || 1)}>
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;