import React, { useState, useEffect } from "react";
import product1Image from '../assets/image1.jpg'; // Importing product1.jpg

const Item = () => {
    // Sample product data
    const product = {
        id: 1,
        name: "Example Product",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 29.99,
        images: [],
        stock: 10
    };

    const [quantity, setQuantity] = useState(1);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    // Load initial cart quantity from local storage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const currentItem = storedCart.find(item => item.id === product.id);
        if (currentItem) {
            setCartQuantity(currentItem.quantity);
            setAddedToCart(true);
        }
    }, []);

    // Event handler for changing quantity
    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1 && value <= product.stock) {
            setQuantity(value);
        }
    };

    // Event handler for adding to cart
    const handleAddToCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const currentItem = storedCart.find(item => item.id === product.id);

        if (currentItem) {
            currentItem.quantity += quantity;
        } else {
            storedCart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(storedCart));
        setCartQuantity(currentItem ? currentItem.quantity : quantity);
        setAddedToCart(true);
    };

    // Event handler for removing from cart
    const handleRemoveFromCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const currentItemIndex = storedCart.findIndex(item => item.id === product.id);

        if (currentItemIndex !== -1) {
            if (storedCart[currentItemIndex].quantity > 1) {
                storedCart[currentItemIndex].quantity -= 1;
                setCartQuantity(storedCart[currentItemIndex].quantity);
            } else {
                storedCart.splice(currentItemIndex, 1);
                setCartQuantity(0);
                setAddedToCart(false);
            }

            localStorage.setItem('cart', JSON.stringify(storedCart));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#AF8F6F] to-[#74512D] flex items-center justify-center py-8">
            <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg">
                <div className="flex flex-wrap -mx-4">
                    {/* Product Images Section */}
                    <div className="w-full md:w-1/2 px-4 mb-4 flex justify-center">
                        <img src={product1Image} alt="Product" className="max-w-full h-auto rounded-md shadow-md" />
                    </div>

                    {/* Product Details Section */}
                    <div className="w-full md:w-1/2 px-4 mb-4 flex items-center">
                        <div className="p-6 text-black">
                            <h2 className="text-4xl font-bold mb-2 text-gray-800">{product.name}</h2>
                            <p className="text-lg mb-4 text-gray-600">{product.description}</p>
                            <div className="mb-4">
                                <p className="text-2xl font-semibold mb-2 text-gray-800">${product.price.toFixed(2)}</p>
                                <label htmlFor="quantity" className="block mb-1 text-gray-800">Quantity:</label>
                                <div className="flex items-center">
                                    <select
                                        id="quantity"
                                        className="w-1/4 border border-gray-300 rounded py-1 px-2 text-sm focus:outline-none focus:border-blue-500 text-black bg-white"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    >
                                        {[...Array(product.stock)].map((_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-4 items-center">
                                <button
                                    className={`py-2 px-4 rounded focus:outline-none ${addedToCart ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                                    onClick={handleAddToCart}
                                >
                                    {addedToCart ? "Added to Cart" : "Add to Cart"}
                                </button>
                                {cartQuantity > 0 ? (
                                    <>
                                        <button
                                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                            onClick={handleRemoveFromCart}
                                        >
                                            Remove from Cart
                                        </button>
                                        <span className="text-gray-800">Items in cart: {cartQuantity}</span>
                                    </>
                                ) : (
                                    <span className="text-gray-800">There are no items in the cart</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
