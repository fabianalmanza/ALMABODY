import React from 'react';
import { useCart } from '../CartContext';

const products = [
  { id: 1, name: 'Margarita', price: 59.99, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Ana', price: 64.99, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Julieta', price: 54.99, image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Mango', price: 49.99, image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Rosa', price: 69.99, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 6, name: 'Victoria', price: 74.99, image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 7, name: 'Ale', price: 59.99, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
];

const ProductGrid = ({ searchTerm }) => {
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <button
                onClick={() => addToCart(product)}
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Add to Cart
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;