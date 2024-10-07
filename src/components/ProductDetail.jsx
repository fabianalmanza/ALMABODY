import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { products } from './ProductGrid';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const slidesToShow = 2;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <p>Product not found!</p>;
  }

  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 6);

  const handleNext = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(relatedProducts.length / slidesToShow)
    );
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(relatedProducts.length / slidesToShow)) %
        Math.ceil(relatedProducts.length / slidesToShow)
    );
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor, quantity });
    setQuantity(1); // Restablecer la cantidad a 1
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
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
          <p className="text-xl text-gray-600 mb-4">
            ${product.price.toFixed(2)}
          </p>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Color</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: color,
                    border: color === 'white' ? '1px solid #e5e7eb' : undefined,
                  }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600 mr-4">Quantity</p>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={handleDecreaseQuantity}
                className="p-2 hover:bg-gray-100 rounded-l-lg"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 text-center min-w-[3rem]">
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="p-2 hover:bg-gray-100 rounded-r-lg"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-2 px-4 flex items-center rounded-lg hover:bg-gray-800"
          >
            <ShoppingBag className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Carousel */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Related Products
        </h3>

        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded"
          >
            &#60;
          </button>
          <div className="flex overflow-hidden">
            {relatedProducts
              .slice(
                currentSlide * slidesToShow,
                currentSlide * slidesToShow + slidesToShow
              )
              .map((relatedProduct) => {
                const [relatedSelectedColor, setRelatedSelectedColor] =
                  useState(relatedProduct.colors[0]);
                return (
                  <div key={relatedProduct.id} className="p-2 w-1/2">
                    <Link
                      to={`/product/${relatedProduct.id}`}
                      className="block"
                    >
                      <img
                        src={relatedProduct.images[relatedSelectedColor]}
                        alt={relatedProduct.name}
                        className="w-full h-28 object-cover rounded-lg"
                      />
                      <h4 className="text-lg font-semibold mt-2">
                        {relatedProduct.name}
                      </h4>
                      <p className="text-gray-600">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </Link>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-1">Color</p>
                      <div className="flex gap-2">
                        {relatedProduct.colors.map((color) => (
                          <button
                            key={color}
                            onClick={(e) => {
                              e.stopPropagation();
                              setRelatedSelectedColor(color);
                            }}
                            className={`w-6 h-6 rounded-full border-2 ${
                              relatedSelectedColor === color
                                ? 'border-blue-500'
                                : 'border-gray-300'
                            }`}
                            style={{
                              backgroundColor: color,
                              border:
                                color === 'white'
                                  ? '1px solid #e5e7eb'
                                  : undefined,
                            }}
                            aria-label={`Select ${color} color`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded"
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
