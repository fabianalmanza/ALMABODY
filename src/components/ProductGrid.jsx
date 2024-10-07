import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

export const products = [
  { 
    id: 1, 
    name: 'Margarita', 
    price: 59.99, 
    colors: ['white', 'black'],
    images: {
      white: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      black: '/api/placeholder/800/800'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.' 
  },
  { 
    id: 2, 
    name: 'Ana', 
    price: 64.99, 
    colors: ['white', 'black'],
    images: {
      white: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      black: '/api/placeholder/800/800'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.' 
  },
  { 
    id: 3, 
    name: 'Julieta', 
    price: 54.99, 
    colors: ['white', 'black'],
    images: {
      white: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      black: '/api/placeholder/800/800'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.' 
  },
  { 
    id: 4, 
    name: 'Mango', 
    price: 49.99, 
    colors: ['white', 'black'],
    images: {
      white: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      black: '/api/placeholder/800/800'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.' 
  },
  { 
    id: 5, 
    name: 'Rosa', 
    price: 69.99, 
    colors: ['white', 'black'],
    images: {
      white: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      black: '/api/placeholder/800/800'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.' 
  },
  { 
    id: 6, 
    name: 'Victoria', 
    price: 74.99, 
    colors: ['white', 'black'],
    images: {
      white: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      black: '/api/placeholder/800/800'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.' 
  },
  { 
    id: 7, 
    name: 'Ale', 
    price: 59.99, 
    colors: ['black'],
    images: {
      black: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.' 
  }
];

const ProductGrid = ({ searchTerm }) => {
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[selectedColor]} 
            alt={product.name} 
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        <div className="absolute bottom-0 left-0 right-0">
          <button
            onClick={() => addToCart({ ...product, selectedColor })}
            className="w-full bg-black bg-opacity-75 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        </Link>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        
        {/* Color Selection */}
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Color</p>
          <div className="flex gap-2">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
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
      </div>
    </div>
  );
};

export default ProductGrid;