import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import your images
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';

const imageMap = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
};

const Categories = () => {
  const [categories, setCategories] = useState([{
    category_id: 1,
    category_name: 'Terracotta Ornaments & Home Décor',
    image: image1,
    },
    {
    category_id: 2,
    category_name: 'Macrame Based Handicraft',
    image: image2,
    },
    {
    category_id: 3,
    category_name: 'Jute Bags & Allied Products',
    image: image3,
    },
    {
    category_id: 4,
    category_name: 'Macrame Based Handicraft',
    image: image4,
    },
    {
    category_id: 5,
    category_name: 'Banana Fiber based ornaments & Home Décor',
    image: image5,
    },
    {
    category_id: 6,
    category_name: 'others',
    image: image6,
    },
    ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/get-categories')
  //     .then(response => {
  //       setCategories(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching the categories:', error);
  //       setError('Failed to load categories. Please try again later.');
  //       setLoading(false);
  //     });
  // }, []);

  const handleCategoryClick = () => {
    navigate(`/product`);
  };

  if (loading) {
    return <div className="text-center my-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mb-16 px-4 bg-white" id='categories'>
      <h2 className="text-4xl font-bold text-center my-8 text-[#543310]">
        Our <span className="text-[#543310]">Categories</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category.category_id} 
            className="relative group overflow-hidden rounded-lg shadow-md"
            onClick={handleCategoryClick}
          >
            <div className="overflow-hidden">
              <img 
                src={imageMap[category.category_id] || image1} 
                alt={`Category ${category.category_name}`} 
                className="w-full h-64 object-cover transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-lg font-semibold transition-opacity opacity-0 group-hover:opacity-100">
                <p>{category.category_name}</p>
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="text-lg font-semibold text-[#74512D]">{category.category_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;