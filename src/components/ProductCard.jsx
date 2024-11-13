import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';


const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(Object.keys(product.images)[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, selectedColor, quantity: 1 });
  };

  return (
    <div className="group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg">
          <OptimizedImage
            src={product.images[selectedColor][selectedImageIndex]}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Botón de agregar al carrito - siempre visible */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full"
            aria-label="Add to cart"
          >
            <ShoppingBag size={20} />
          </button>
          
          {/* Indicadores de imágenes */}
          {product.images[selectedColor].length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
              {product.images[selectedColor].map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    selectedImageIndex === index ? 'bg-black' : 'bg-gray-400'
                  }`}
                  aria-label={`Select image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="mt-2">
        <p className="text-sm text-gray-600 mb-1">Color</p>
        <div className="flex gap-2">
          {Object.keys(product.images).map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border ${
                selectedColor === color ? 'border-black' : 'border-gray-300'
              }`}
              style={{
                backgroundColor: color,
              }}
              aria-label={`Select ${color} color`}
            >
              {selectedColor === color && (
                <Check size={14} className="text-gray-400 mx-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 