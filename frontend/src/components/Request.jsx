import React, { useState } from 'react';
import './PendingRequestList.css'; // Import CSS file for styling

const PendingRequestList = () => {
    // Sample data for pending requests including images
    const [pendingRequests, setPendingRequests] = useState([
        {
            id: 1,
            itemName: 'Product A',
            quantity: 3,
            image: 'https://via.placeholder.com/150', // Example placeholder image URL
        },
        {
            id: 2,
            itemName: 'Service B',
            quantity: 1,
            image: 'https://via.placeholder.com/150', // Example placeholder image URL
        },
        {
            id: 3,
            itemName: 'Material C',
            quantity: 5,
            image: 'https://via.placeholder.com/150', // Example placeholder image URL
        },
    ]);

    // State to track whether to show more images for a request
    const [showMoreImagesForId, setShowMoreImagesForId] = useState(null);

    // Function to handle clicking on a request to show more images
    const handleShowMoreImages = (id) => {
        if (showMoreImagesForId === id) {
            setShowMoreImagesForId(null); // Hide images if already shown
        } else {
            setShowMoreImagesForId(id); // Show more images for this request
        }
    };

    // Function to handle approval of a request
    const handleApprove = (id) => {
        // Logic to approve the request, e.g., send data to backend, update state, etc.
        console.log(`Request ${id} approved`);
        // Example: Update state to remove the approved request
        const updatedRequests = pendingRequests.filter(request => request.id !== id);
        setPendingRequests(updatedRequests);
    };

    // Function to handle rejection of a request
    const handleReject = (id) => {
        // Logic to reject the request, e.g., send data to backend, update state, etc.
        console.log(`Request ${id} rejected`);
        // Example: Update state to remove the rejected request
        const updatedRequests = pendingRequests.filter(request => request.id !== id);
        setPendingRequests(updatedRequests);
    };

    // Generate additional images for the specified request
    const generateMoreImages = (id) => {
        const request = pendingRequests.find(request => request.id === id);
        const newImages = Array.from({ length: 5 }, (_, index) => ({
            id: `${id}-${index}`,
            itemName: `${request.itemName} - ${index + 1}`,
            quantity: request.quantity,
            image: request.image,
        }));
        return newImages;
    };

    return (
        <div className="pending-request-list">
            <h2>Pending Requests</h2>
            {pendingRequests.length === 0 ? (
                <p>No pending requests at the moment.</p>
            ) : (
                <ul>
                    {pendingRequests.map(request => (
                        <li key={request.id} className="request-item">
                            <div className="request-info">
                                <div className="request-image">
                                    <img src={request.image} alt={request.itemName} />
                                </div>
                                <div className="request-details">
                                    <strong>Item:</strong> {request.itemName}<br />
                                    <strong>Quantity:</strong> {request.quantity}
                                </div>
                            </div>
                            <div className="request-actions">
                                <button onClick={() => handleApprove(request.id)}>Approve</button>
                                <button onClick={() => handleReject(request.id)}>Reject</button>
                                <button onClick={() => handleShowMoreImages(request.id)}>
                                    {showMoreImagesForId === request.id ? 'Hide Images' : 'Show More Images'}
                                </button>
                            </div>
                            {showMoreImagesForId === request.id && (
                                <ul className="more-images">
                                    {generateMoreImages(request.id).map(image => (
                                        <li key={image.id}>
                                            <img src={image.image} alt={image.itemName} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PendingRequestList;
