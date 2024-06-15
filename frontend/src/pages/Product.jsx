import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([{
    "product_id": 1,
    "product_name": "Laptop",
    "SKU": "LP1001",
    "product_price": 999,
    "product_description": "High-performance laptop",
    "category_id": 1,
    "image": "https://placehold.co/600x400/EEE/31343C",
    },
    {
    "product_id": 2,
    "product_name": "Smartphone",
    "SKU": "SP1002",
    "product_price": 699,
    "product_description": "Latest model smartphone",
    "category_id": 2,
    "image": "https://placehold.co/600x400/EEE/31343C",
    },
    {
    "product_id": 3,
    "product_name": "Wireless Mouse",
    "SKU": "WM1003",
    "product_price": 25,
    "product_description": "Ergonomic wireless mouse",
    "category_id": 3,
    "image": "https://placehold.co/600x400/EEE/31343C",
    },
    {
    "product_id": 4,
    "product_name": "Bluetooth Speaker",
    "SKU": "BS1004",
    "product_price": 49,
    "product_description": "Portable Bluetooth speaker",
    "category_id": 4,
    "image": "https://placehold.co/600x400/EEE/31343C",
    },
    {
    "product_id": 5,
    "product_name": "Smartwatch",
    "SKU": "SW1005",
    "product_price": 199,
    "product_description": "Fitness tracking smartwatch",
    "category_id": 2,
    "image": "https://placehold.co/600x400/EEE/31343C",
    }]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/get-products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div
            key={product.product_id}
            className="product-card p-4 border rounded-lg shadow-md cursor-pointer"
            onClick={() => handleProductClick(product.product_id)}
          >
            <h2 className="text-xl font-semibold">{product.product_name}</h2>
            <img src={product.image} alt={product.product_name} className="w-full h-48 object-cover rounded-lg mt-4" />
            <p className="mt-4">{product.product_description}</p>
            <p className="mt-2 text-lg font-semibold">${product.product_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
