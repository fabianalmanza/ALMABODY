import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify'; // Importa toast

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id && item.selectedColor === product.selectedColor
      );
      if (existingItem) {
        toast.success(`Cantidad aumentada para ${product.name}`); // Muestra la alerta
        return prevItems.map((item) =>
          item.id === product.id && item.selectedColor === product.selectedColor
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      toast.success(`${product.name} añadido al carrito`); // Muestra la alerta
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, selectedColor) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== productId || item.selectedColor !== selectedColor
      )
    );
  };

  const updateQuantity = (productId, selectedColor, quantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.selectedColor === selectedColor
            ? quantity > 0
              ? { ...item, quantity }
              : null
            : item
        )
        .filter(Boolean)
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItemCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
