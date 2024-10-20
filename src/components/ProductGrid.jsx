import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';

const ProductGrid = ({ searchTerm }) => {
  const products = useProducts();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Nuestros Productos
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[selectedColor][selectedImageIndex]}
            alt={product.name}
            className="w-full h-72 sm:h-92 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        <button
          onClick={() => addToCart({ ...product, selectedColor })}
          className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100 transition-opacity duration-300"
          aria-label="Add to Cart"
        >
          <ShoppingBag size={20} />
        </button>
      </div>

      <div className="flex justify-center mt-2">
        {product.images[selectedColor].map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`w-2 h-2 rounded-full mx-1 ${selectedImageIndex === index ? 'bg-black' : 'bg-gray-400'}`}
            aria-label={`Select image ${index + 1}`}
          />
        ))}
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2">${product.price}</p>

        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Color</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedImageIndex(0);
                }}
                className="w-6 h-6 rounded-full border border-gray-400 relative flex items-center justify-center"
                style={{
                  backgroundColor: color,
                }}
                aria-label={`Select ${color} color`}
              >
                {selectedColor === color && (
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
    </div>
  );
};

export default ProductGrid;