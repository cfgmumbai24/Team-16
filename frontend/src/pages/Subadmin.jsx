import React, { useState, useEffect } from 'react';
import image1 from '../assets/image1.jpg';
import Modal from '../components/Modal';
import axios from 'axios'; 

const Subadmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const apiUrl = "https://77f8-167-103-2-95.ngrok-free.app";

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
   const response  = await axios.get(apiUrl + "/api/get-products")
   console.log(response);
    // setTimeout(() => {
    //   setRequests(dummyData);
    //   setLoading(false);
    // }, 1000);
  };

  const handleApprove = (id) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  const handleReject = (id) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col cursor-pointer"
            onClick={() => openModal(request)}
          >
            <img src={request.imageUrl} alt={request.productName} className="w-full h-32 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{request.productName}</h2>
            <p className="mb-4 text-gray-600">{request.description}</p>
            <div className="mt-auto flex justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprove(request.id);
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Approve
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReject(request.id);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <Modal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
      )}
    </div>
  );
};

export default Subadmin;