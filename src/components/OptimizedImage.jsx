import React, { useState, useEffect } from 'react';
import { isImageCached } from '../utils/imageCache';

const OptimizedImage = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(!isImageCached(src));
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(!isImageCached(src));
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && !error && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse rounded-lg`} />
      )}
      {error ? (
        <div className={`${className} bg-gray-200 flex items-center justify-center`}>
          <span className="text-gray-400">Error al cargar la imagen</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 