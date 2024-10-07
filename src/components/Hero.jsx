import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://i.imgur.com/CZ6JUrU.jpeg',
    'https://instagram.fbga2-1.fna.fbcdn.net/v/t39.30808-6/438101382_18017000003254416_7729192953803214936_n.jpg?stp=dst-jpg_e35_p720x720&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbga2-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=DfJw6OFLa-sQ7kNvgEid8O0&_nc_gid=b599674214bf4babb3a9a7b405d7fc9b&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzM1OTI0NzYxNjU4NjcxMTczMw%3D%3D.3-ccb7-5&oh=00_AYAXyDmKPxijWmAmnen-6bteSBEH8CfOneGPEwFMadjOMw&oe=670919F4&_nc_sid=22de04',
    'https://instagram.fbga2-1.fna.fbcdn.net/v/t39.30808-6/441930759_18018297365254416_6555788677637497815_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbga2-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=pLIkigXWCTEQ7kNvgEp2A-h&_nc_gid=b599674214bf4babb3a9a7b405d7fc9b&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzM2ODA5MjAzMTg4MjU2NTg4Mw%3D%3D.3-ccb7-5&oh=00_AYBA_1fA61CF5CedZNxyV3u8d3jdvoW0TFeZp469oUXIVg&oe=6709004C&_nc_sid=22de04',
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