import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';

export const products = [
  {
    id: 1,
    name: 'Body Margarita',
    price: 59.99,
    colors: ['white', 'black'],
    images: {
      white: 'https://i.imgur.com/yWJ3E9X.jpeg',
      black: 'https://i.imgur.com/KTqWMDs.jpeg',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.',
  },
  {
    id: 2,
    name: 'Body Ana',
    price: 64.99,
    colors: ['white', 'black'],
    images: {
      white: 'https://i.imgur.com/yWJ3E9X.jpeg',
      black: 'https://i.imgur.com/KTqWMDs.jpeg',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.',
  },
  {
    id: 3,
    name: 'Body Julieta',
    price: 54.99,
    colors: ['white', 'black'],
    images: {
      white: 'https://i.imgur.com/yWJ3E9X.jpeg',
      black: 'https://i.imgur.com/KTqWMDs.jpeg',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.',
  },
  {
    id: 4,
    name: 'Body Mango',
    price: 49.99,
    colors: ['white', 'black'],
    images: {
      white: 'https://i.imgur.com/yWJ3E9X.jpeg',
      black: 'https://i.imgur.com/KTqWMDs.jpeg',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.',
  },
  {
    id: 5,
    name: 'Body Rosa',
    price: 69.99,
    colors: ['white', 'black'],
    images: {
      white: 'https://i.imgur.com/yWJ3E9X.jpeg',
      black: 'https://i.imgur.com/KTqWMDs.jpeg',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.',
  },
  {
    id: 6,
    name: 'Body Victoria',
    price: 74.99,
    colors: ['white', 'black'],
    images: {
      white: 'https://i.imgur.com/yWJ3E9X.jpeg',
      black: 'https://i.imgur.com/KTqWMDs.jpeg',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.',
  },
  {
    id: 7,
    name: 'Body Ale',
    price: 59.99,
    colors: ['white', 'black'],
    images: {
      white: 'https://i.imgur.com/yWJ3E9X.jpeg',
      black: 'https://i.imgur.com/KTqWMDs.jpeg',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula auctor, blandit ipsum ac, fermentum nunc.',
  },
];
const ProductGrid = ({ searchTerm }) => {
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
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[selectedColor]}
            alt={product.name}
            className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
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

      <div className="p-4">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>

        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Color</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className="w-6 h-6 rounded-full border border-gray-300 relative flex items-center justify-center"
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