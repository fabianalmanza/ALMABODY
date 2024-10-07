import React, { useState, useEffect } from 'react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const instagramUsername = 'alma_bodys';
  const [currentIndex, setCurrentIndex] = useState(0);
  const limit = 3; // Número máximo de publicaciones a mostrar

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      // Usar datos de ejemplo
      const placeholderPosts = [
        {
          id: 1,
          imageUrl: 'https://i.imgur.com/yWJ3E9X.jpeg',
          caption: 'Beautiful ALMA body',
        },
        {
          id: 2,
          imageUrl: 'https://i.imgur.com/yWJ3E9X.jpeg',
          caption: 'Elegance redefined',
        },
        {
          id: 3,
          imageUrl: 'https://i.imgur.com/yWJ3E9X.jpeg',
          caption: 'Comfort meets style',
        },
        {
          id: 4,
          imageUrl: 'https://i.imgur.com/yWJ3E9X.jpeg',
          caption: 'ALMAs latest collection',
        },
        {
          id: 5,
          imageUrl: 'https://i.imgur.com/yWJ3E9X.jpeg',
          caption: 'Designed for you',
        },
        {
          id: 6,
          imageUrl: 'https://i.imgur.com/yWJ3E9X.jpeg',
          caption: 'ALMA: Feel confident',
        },
      ];
      setPosts(placeholderPosts);
    };

    fetchInstagramPosts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + posts.length) % posts.length
    );
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Follow Us on Instagram
        </h2>
        <div className="relative">
          <div className="flex overflow-hidden">
            {posts.slice(currentIndex, currentIndex + limit).map((post) => (
              <div
                key={post.id}
                className="relative w-full transition-transform duration-300 mx-1" // Agregado margen
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center p-4">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
        <div className="text-center mt-8">
          <a
            href={`https://www.instagram.com/${instagramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300"
          >
            Follow @{instagramUsername}
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
