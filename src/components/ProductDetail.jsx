import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import { products } from './ProductGrid';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const productId = parseInt(id, 10);
  const product = products.find(p => p.id === productId);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images[selectedColor]} 
            alt={product.name} 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          
          {/* Color Selection */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Color</p>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: color,
                    border: color === 'white' ? '1px solid #e5e7eb' : undefined
                  }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-700 mb-4">{product.description}</p>

          <button 
            onClick={() => addToCart({ ...product, selectedColor })}
            className="bg-black text-white py-2 px-4 hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
