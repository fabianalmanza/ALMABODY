import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const RelatedProduct = ({ product }) => {
  const navigate = useNavigate();
  const [relatedSelectedColor, setRelatedSelectedColor] = useState(product.colors[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const handleProductClick = (e) => {
    e.preventDefault();
    navigate(`/product/${product.id}`);
    window.location.reload();
  };

  return (
    <div className="p-2 w-1/2">
      <div
        onClick={handleProductClick}
        className="relative cursor-pointer group"
      >
        <img
          src={product.images[relatedSelectedColor][selectedImageIndex]}
          alt={product.name}
          className="w-full h-28 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Image indicators */}
        {product.images[relatedSelectedColor].length > 1 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images[relatedSelectedColor].map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
                  selectedImageIndex === index ? 'bg-white' : 'bg-white/60'
                }`}
                aria-label={`Select image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <h4 className="text-lg font-semibold mt-2">
          {product.name}
        </h4>
        <p className="text-gray-600">
          ${product.price}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-600 mb-1">Color</p>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={(e) => {
                e.stopPropagation();
                setRelatedSelectedColor(color);
                setSelectedImageIndex(0);
              }}
              className="w-6 h-6 rounded-full border border-gray-300 relative flex items-center justify-center"
              style={{
                backgroundColor: color,
              }}
              aria-label={`Select ${color} color`}
            >
              {relatedSelectedColor === color && (
                <Check
                  size={14}
                  className='text-gray-400'
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct; 