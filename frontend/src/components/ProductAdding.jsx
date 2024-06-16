import React, { useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Teracotta', category: 'Crafts', color: 'Yellow', description: '', price: '', approved: false },
        { id: 2, name: 'Teracotta', category: 'Crafts', color: 'Black', description: '', price: '', approved: false },
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
        <div className="flex flex-wrap gap-4 p-4">
            <button
                onClick={() => setIsAddingProduct(true)}
                style={{
                    background: '#AF8F6F',
                    color: 'white',
                    border: '1px solid #000',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease-in-out',
                    cursor: 'pointer',
                    outline: 'none',
                }}
            >
                Add Product
            </button>
            {isAddingProduct && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 rounded-lg shadow-lg z-10">
                    <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                    <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-bold">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category" className="font-bold">Category:</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="color" className="font-bold">Color:</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="font-bold">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="font-bold">Price:</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                style={{
                                    background: '#AF8F6F',
                                    color: 'white',
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    padding: '8px 16px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAddingProduct(false)}
                                style={{
                                    background: '#ccc',
                                    color: '#333',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px 16px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {products.map((product) => (
                <div key={product.id} className="border border-gray-300 rounded-lg p-4 w-80 bg-white shadow-md">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-base">Category: {product.category}</p>
                    <p className="text-base">Color: {product.color}</p>
                    <p className="text-base">Description: {product.description}</p>
                    <p className="text-base">Price: {product.price}</p>
                    {product.approved ? (
                        <p className="text-green-500 font-bold">Approved</p>
                    ) : (
                        <button
                            onClick={() => handleApproveProduct(product.id)}
                            style={{
                                background: '#AF8F6F',
                                color: 'white',
                                border: '1px solid #000',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'background-color 0.3s ease-in-out',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        >
                            Approve
                        </button>
                    )}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handleEditProduct(product.id)}
                            style={{
                                background: '#AF8F6F',
                                color: 'white',
                                border: '1px solid #000',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'background-color 0.3s ease-in-out',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            style={{
                                background: '#FF4C4C',
                                color: 'white',
                                border: '1px solid #000',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'background-color 0.3s ease-in-out',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {isEditing && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 rounded-lg shadow-lg z-10">
                    <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                    <form onSubmit={handleUpdateProduct} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-bold">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category" className="font-bold">Category:</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="color" className="font-bold">Color:</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="font-bold">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="font-bold">Price:</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '14px',
                                }}
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                style={{
                                    background: '#AF8F6F',
                                    color: 'white',
                                    border: '1px solid #000',
                                    borderRadius: '4px',
                                    padding: '8px 16px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={closeEditModal}
                                style={{
                                    background: '#ccc',
                                    color: '#333',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px 16px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;
