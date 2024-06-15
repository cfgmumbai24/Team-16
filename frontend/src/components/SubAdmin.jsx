import React, { useState } from 'react';
import './AddSellerForm.css';

const citiesInIndia = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
    'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
    'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
    'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad',
    'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Howrah', 'Ranchi', 'Gwalior', 'Jabalpur',
    'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh',
    'Solapur', 'Hubli-Dharwad', 'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon', 'Aligarh', 'Jalandhar',
    'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Mira-Bhayandar', 'Warangal', 'Guntur', 'Bhiwandi',
    'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack',
    'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Rourkela',
    'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri',
    'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli-Miraj & Kupwad', 'Mangalore', 'Erode', 'Belgaum',
    'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur', 'Maheshtala'
];

const AddSellerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        state: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        // Add your form submission logic here
        // Example: Send formData to the server
        // axios.post('/api/users', formData)
        //   .then(response => {
        //     console.log('User added successfully', response);
        //   })
        //   .catch(error => {
        //     console.error('There was an error adding the user!', error);
        //   });
    };

    return (
        <div className="container">
            <div className="header">
                <h2 className="text">Adding Seller</h2>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit} className="inputs">
                <div className="input">
                    <label htmlFor="name"></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="input">
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="input">
                    <label htmlFor="phoneNumber"></label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                    />
                </div>
                <div className="input">
                    <label htmlFor="city"></label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                    />
                </div>
                <div className="input">
                    <label htmlFor="state"></label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                    />
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit">Submit Details</button>
                </div>
            </form>
        </div>
    );
};

export default AddSellerForm;
