import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://i.imgur.com/CZ6JUrU.jpeg',
    'https://i.imgur.com/svfx90P.jpeg',
    'https://i.imgur.com/bFobGr0.jpeg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-[75vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Hero ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      ))}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-300 z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-300 z-10"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full ${
              currentImage === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;