// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

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
        <div className="container">
            <h2 className="my-4">Products</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product._id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Price: ${product.price}</p>
                                <div className="input-group mb-3">
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue="1"
                                        className="form-control"
                                        onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                                    />
                                    <button 
                                        onClick={() => addToCart(product._id, quantities[product._id] || 1)}
                                        className="btn btn-primary"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
