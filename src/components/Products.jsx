import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products/getProducts";
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('User token is missing');
        return;
      }

      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.log(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Products</h2>
      <div className="row justify-content-center">
        {products.length > 0 ? (
          products.map((item, index) => (
            <div className="col-md-4 mb-4 d-flex justify-content-center" key={index}>
              <div className="card shadow-lg border-0 rounded-3 text-center" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">{item.name}</h5>
                  <p className="card-text text-muted">Category: {item.category}</p>
                  <p className="card-text fs-5">
                    <strong className="text-success">Price: ${item.prize}</strong>
                  </p>
                  <p className={`badge ${item.InStock ? 'bg-success' : 'bg-danger'}`}>
                    {item.InStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <br />
                  <button className="btn btn-warning w-100 fw-bold mt-2">Add To Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center fs-4 text-danger">No products available</p>
        )}
      </div>
    </div>
  );
}

export default Products;
