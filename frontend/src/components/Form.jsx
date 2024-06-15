import React, { useState, useEffect } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        additionalInfo: ''
    });

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch cart items from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);

        // Calculate the total price
        const total = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email } = formData;

        // Check if name or email is empty
        if (!name || !email) {
            alert('Name and email are required.');
            return;
        }

        // Send the form data to the backend
        try {
            const response = await fetch('https://your-backend-endpoint.com/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, cartItems, totalPrice })
            });

            if (response.ok) {
                alert('Form submitted successfully');
            } else {
                alert('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form');
        }
    };

    const handleClearCart = () => {
        // Clear cart items in local storage and update state
        localStorage.removeItem('cart');
        setCartItems([]);
        setTotalPrice(0);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Phone Number<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additionalInfo">
                        Additional Info
                    </label>
                    <textarea
                        name="additionalInfo"
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Cart Items</h3>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-700">No items in the cart</p>
                    ) : (
                        <ul className="text-gray-700">
                            {cartItems.map(item => (
                                <li key={item.id} className="mb-2">
                                    <span className="font-bold">{item.name}</span> - ${item.price.toFixed(2)} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                    )}
                    <p className="text-gray-700 mt-4">Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
