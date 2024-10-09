import React, { useState, useEffect } from 'react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const instagramUsername = 'alma_bodys';
  const [currentIndex, setCurrentIndex] = useState(0);
  const limit = 3;

  useEffect(() => {
    const fetchInstagramPosts = async () => {
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
          imageUrl: 'https://i.imgur.com/CZ6JUrU.jpeg',
          caption: 'Comfort meets style',
        },
        {
          id: 4,
          imageUrl: 'https://i.imgur.com/yWJ3E9X.jpeg',
          caption: 'ALMAs latest collection',
        },
        {
          id: 5,
          imageUrl: 'https://i.imgur.com/KTqWMDs.jpeg',
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

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, posts.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (posts.length - limit + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return posts.length - limit;
      }
      return prevIndex - 1;
    });
  };

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
        Síguenos en Instagram
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / limit)}%)`,
              }}
            >
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="relative flex-shrink-0 px-2"
                  style={{ width: `${100 / limit}%` }}
                >
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <p className="text-white text-center p-4">{post.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none z-10"
            disabled={currentIndex === 0}
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none z-10"
            disabled={currentIndex === posts.length - limit}
          >
            →
          </button>
        </div>
        <div className="text-center mt-8">
          <a
            href={`https://www.instagram.com/${instagramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white font-bold py-2 px-6 rounded-full hover:bg-gray-600 transition duration-300"
          >
            Follow @{instagramUsername}
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;