import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import product1Image from '../assets/image1.jpg';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Item = () => {
    const { productId } = useParams();
    // Sample product data
    const [product, setProduct] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate
    // const product = {
    //     id: 1,
    //     name: "Example Product",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //     price: 29.99,
    //     images: [],
    //     stock: 10
    // };


    const fetchData = (async () => {
        const response = await axios.get('http://localhost:8080/api/get-product/' + productId)
        setProduct(response.data)
    })




    useEffect(() => {
        fetchData()
        console.log(product);
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const currentItem = storedCart.find(item => item.id === product.product_id);
        if (currentItem) {
            setCartQuantity(currentItem.quantity);
            setAddedToCart(true);
        }
    }, []);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const currentItem = storedCart.find(item => item.id === product.product_id);

        if (currentItem) {
            currentItem.quantity += quantity;
        } else {
            storedCart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(storedCart));
        setCartQuantity(currentItem ? currentItem.quantity : quantity);
        setAddedToCart(true);
    };

    const handleResetCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const currentItemIndex = storedCart.findIndex(item => item.id === product.product_id);

        if (currentItemIndex !== -1) {
            storedCart.splice(currentItemIndex, 1);
            setCartQuantity(0);
            setAddedToCart(false);
            localStorage.setItem('cart', JSON.stringify(storedCart));
        }
    };

    const handleIncreaseQuantity = () => {

        setQuantity(quantity + 1);

    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout'); // Navigate to the checkout page
    };
    if (product) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-[#AF8F6F] to-[#74512D] flex items-center justify-center py-8">
                <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 px-4 mb-4 flex justify-center">
                            <img src={`${"http://localhost:8080/api/getUploadfiles/"}${product.product_image}`}alt="Product" className="max-w-full h-auto rounded-md shadow-md" />
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-4 flex items-center">
                            <div className="p-6 text-black">
                                <h2 className="text-4xl font-bold mb-2 text-gray-800">{product.product_name}</h2>
                                <p className="text-lg mb-4 text-gray-600">{product.product_description}</p>
                                <div className="mb-4">
                                    <p className="text-2xl font-semibold mb-2 text-gray-800">Rs.{product.product_price.toFixed(2)}</p>
                                    <label htmlFor="quantity" className="block mb-1 text-gray-800">Quantity:</label>
                                    <div className="flex items-center">
                                        <button
                                            className="py-1 px-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-l"
                                            onClick={handleDecreaseQuantity}
                                        >-</button>
                                        <input
                                            id="quantity"
                                            className="w-1/4 border border-gray-300 py-1 text-center text-sm focus:outline-none focus:border-blue-500 text-black bg-white"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            type="number"
                                            min="1"

                                        />
                                        <button
                                            className="py-1 px-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-r"
                                            onClick={handleIncreaseQuantity}
                                        >+</button>
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
                                                onClick={handleResetCart}
                                            >
                                                <FaTrash />
                                            </button>
                                            <span className="text-gray-800">Items in cart: {cartQuantity}</span>
                                            <button
                                                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                                                onClick={handleCheckout}
                                            >
                                                Checkout
                                            </button>
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
    }
};

export default Item;
