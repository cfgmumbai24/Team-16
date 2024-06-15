// import homeImg from '../assets/home2.jpg';
// import Categories from '../components/Catergories';

// const Home = () => {
//     return (
//         <>
//         <div className='flex flex-col md:flex-row w-screen h-screen items-center bg-[#74512D] text-[#F8F4E1]'>
//             <div className='hidden md:flex md:w-1/3 h-auto justify-center items-center pl-4 md:pl-24'>
//                 <img src={homeImg} className='w-3/4 md:w-full h-auto object-cover' style={{ maxWidth: '95%' }} alt="Home" />
//             </div>
//             <div className='flex-1 h-full flex flex-col justify-center items-center text-center md:text-left'>
//                 <h1 className='text-2xl md:text-6xl font-bold'>Janardan Prasad Memorial</h1>
//                 <h2 className='text-lg md:text-2xl'>Multipurpose Social Service Society</h2>
//             </div>
//         </div>
//         <Categories />
//         </>
//     );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import homeImg1 from "../assets/image1.jpg";
import homeImg2 from "../assets/image2.jpg";
import homeImg3 from "../assets/image3.jpg";
import homeImg4 from "../assets/image4.jpg";
import homeImg5 from "../assets/image5.jpg";
import homeImg6 from "../assets/image6.jpg";
import Categories from "../components/Catergories";

const images = [homeImg1, homeImg2, homeImg3, homeImg4, homeImg5, homeImg6];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="flex flex-col md:flex-row w-screen h-screen items-center bg-[#74512D] text-[#F8F4E1]">
      <div className="hidden md:flex md:w-1/2 h-3/4 justify-center items-center pl-4 md:pl-24">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ maxWidth: "95%" }}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col justify-center items-center text-center md:text-left md:-translate-y-1/4 md:mt-60">
        <h1 className="text-2xl md:text-5xl font-bold">
          Janardan Prasad Memorial
        </h1>
        <h2 className="text-lg md:text-2xl">
          Multipurpose Social Service Society
        </h2>
        <div className="w-full md:max-w-lg">
          <p className="text-lg md:text-lg mt-10 mx-auto">
            JPMMSS Society was laid down in 2012 by a conglomerate of young dynamic
            entrepreneurs and academicians for the upliftment of society with the
            use of science and technology by providing them skill development,
            livelihood and entrepreneurial opportunities.
          </p>
        </div>
      </div>
    </div>
    <Categories/>
    </>

  );
};

export default Home;
