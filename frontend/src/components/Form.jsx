import React, { useState, useEffect } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false); // State for success message

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
      const response = await fetch('http://localhost:8080/api/submit-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, cartItems, totalPrice })
      });

      if (response.ok) {
        setShowSuccess(true); // Show success message
        setTimeout(() => {
          setShowSuccess(false); // Hide success message after 3 seconds
        }, 3000);
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
        {/* Form fields */}

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

      {/* Success message */}
      {showSuccess && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default Form;
