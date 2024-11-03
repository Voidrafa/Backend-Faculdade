import React, { useEffect } from 'react';

const ProductList = ({ products, cart, setCart }) => {
  const addToCart = async (product) => {
    const response = await fetch('http://localhost:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: product._id }),
    });
    if (response.ok) {
      fetchCartItems(); // Call the function to refresh the cart after adding an item
    }
  };

  const fetchCartItems = async () => {
    const response = await fetch('http://localhost:5000/cart');
    const data = await response.json();
    setCart(data); // Update the cart state with fetched data
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="section-title text-center">Produtos Selecionados</h3>
      <div className="row">
        {products.map(product => (
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card">
              <img src="assets../logo192.png" className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="rate">&#9733;&#9733;&#9733;&#9733;&#9734;</p>
                <p className="card-text">{product.price} <span>R$</span></p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
