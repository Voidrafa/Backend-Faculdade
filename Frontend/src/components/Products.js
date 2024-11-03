// src/components/Products.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });
        if (response.ok) {
            const product = await response.json();
            setProducts([...products, { ...newProduct, _id: product.product_id }]);
            setNewProduct({ name: '', price: '', description: '' }); // Clear the form
        }
    };

    const handleDelete = async (productId) => {
        const response = await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Remove the product from the local state
            setProducts(products.filter(product => product._id !== productId));
        } else {
            console.error('Failed to delete product');
        }
    };

    return (
        <div className="container">
            <h2>Manage Products</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={newProduct.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" value={newProduct.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={newProduct.description} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>

            <h3 className="mt-4">Existing Products</h3>
            <ul className="list-group">
                {products.map(product => (
                    <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/product/${product._id}`}>{product.name}</Link> - ${product.price}
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
