import React, { useState } from 'react';
import './ProductCard.css'; // Example CSS file for styling

const ProductList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Yellow Shirt', category: 'Clothing', color: 'Yellow', description: '', price: '', approved: false },
        { id: 2, name: 'Black Shoes', category: 'Footwear', color: 'Black', description: '', price: '', approved: false },
        // Add more products as needed
    ]);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        category: '',
        color: '',
        description: '',
        price: '',
        approved: false,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    const categories = ['Clothing', 'Footwear', 'Accessories', 'Electronics', 'Home Decor'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            id: products.length + 1,
            name: formData.name,
            category: formData.category,
            color: formData.color,
            description: formData.description,
            price: formData.price,
            approved: formData.approved,
        };
        setProducts([...products, newProduct]);
        setFormData({
            id: null,
            name: '',
            category: '',
            color: '',
            description: '',
            price: '',
            approved: false,
        });
        setIsAddingProduct(false);
    };

    const handleEditProduct = (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        setFormData({
            id: productToEdit.id,
            name: productToEdit.name,
            category: productToEdit.category,
            color: productToEdit.color,
            description: productToEdit.description,
            price: productToEdit.price,
            approved: productToEdit.approved,
        });
        setEditProductId(productId);
        setIsEditing(true);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const updatedProducts = products.map(product =>
            product.id === formData.id ? { ...formData } : product
        );
        setProducts(updatedProducts);
        setFormData({
            id: null,
            name: '',
            category: '',
            color: '',
            description: '',
            price: '',
            approved: false,
        });
        setIsEditing(false);
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    };

    const handleApproveProduct = (productId) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, approved: true } : product
        );
        setProducts(updatedProducts);
    };

    const closeEditModal = () => {
        setIsEditing(false);
        setIsAddingProduct(false);
        setEditProductId(null);
        setFormData({
            id: null,
            name: '',
            category: '',
            color: '',
            description: '',
            price: '',
            approved: false,
        });
    };

    return (
        <div className="product-list">
            <button onClick={() => setIsAddingProduct(true)} style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: '1px solid black',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                outline: 'none',
            }}>Add Product</button>
            {isAddingProduct && (
                <div className="edit-modal">
                    <h2>Add Product</h2>
                    <form onSubmit={handleAddProduct}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="color">Color:</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit">Add</button>
                            <button type="button" onClick={() => setIsAddingProduct(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="category">Category: {product.category}</p>
                    <p className="color">Color: {product.color}</p>
                    <p className="description">Description: {product.description}</p>
                    <p className="price">Price: {product.price}</p>
                    {product.approved ? <p className="approved">Approved</p> : <button onClick={() => handleApproveProduct(product.id)}>Approve</button>}
                    <div className="product-actions">
                        <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    </div>
                </div>
            ))}
            {isEditing && (
                <div className="edit-modal">
                    <h2>Edit Product</h2>
                    <form onSubmit={handleUpdateProduct}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="color">Color:</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit">Update</button>
                            <button type="button" onClick={closeEditModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;
