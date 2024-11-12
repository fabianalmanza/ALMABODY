import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { ShoppingBag, Plus, Minus, Check, Store, X, ArrowBigLeft, ArrowBigRight } from 'lucide-react';

const ProductDetail = () => {
  const products = useProducts();
  const { id } = useParams();
  const { addToCart } = useCart();
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const slidesToShow = 2;

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product || !selectedColor) {
    return <p>Loading...</p>;
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

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      (prev + 1) % product.images[selectedColor].length
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      (prev - 1 + product.images[selectedColor].length) % product.images[selectedColor].length
    );
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.images[selectedColor][selectedImageIndex]}
            alt={product.name}
            className="w-full h-72 md:h-[600px] object-cover rounded-lg cursor-pointer"
            onClick={handleImageClick}
            loading="lazy"
          />
          {product.images[selectedColor].length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
                aria-label="Previous Image"
              >
                <ArrowBigLeft size={24} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
                aria-label="Next Image"
              >
                <ArrowBigRight size={24} />
              </button>
            </>
          )}

          {product.images[selectedColor].length > 1 && (
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
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl text-gray-600 mb-4">
            ${product.price}
          </p>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Color</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedImageIndex(0);
                  }}
                  className="w-8 h-8 rounded-full border border-gray-300 relative flex items-center justify-center"
                  style={{
                    backgroundColor: color,
                  }}
                  aria-label={`Select ${color} color`}
                >
                  {selectedColor === color && (
                    <Check
                      size={16}
                      className='text-gray-400'
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: product.description }} />

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600 mr-4">Cantidad</p>
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

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-2 px-4 flex items-center rounded-lg hover:bg-gray-800"
            >
              <ShoppingBag className="mr-2" />
              Añadir al carrito
            </button>
            <Link
              to="/productos"
              className="bg-gray-200 text-gray-800 py-2 px-4 flex items-center rounded-lg hover:bg-gray-300"
            >
              <Store className="mr-2" />
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <img
              src={product.images[selectedColor][selectedImageIndex]}
              alt={product.name}
              className="w-auto h-125 max-h-screen object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      )}

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
                        src={relatedProduct.images[relatedSelectedColor][0]}
                        alt={relatedProduct.name}
                        className="w-full h-28 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <h4 className="text-lg font-semibold mt-2">
                        {relatedProduct.name}
                      </h4>
                      <p className="text-gray-600">
                        ${relatedProduct.price}
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