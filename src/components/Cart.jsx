import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../CartContext';

const Cart = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const sendToWhatsApp = () => {
    const message = `Hello! I'd like to order the following items:\n\n${cartItems
      .map(item => `${item.name} (x${item.quantity || 1}) - $${(item.price * (item.quantity || 1)).toFixed(2)}`)
      .join('\n')}\n\nTotal: $${total.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={toggleCart}>
              <X size={24} />
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} className="p-1">
                      <Minus size={16} />
                    </button>
                    <span className="mx-2">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="p-1">
                      <Plus size={16} />
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-8">
                <p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
                <button
                  onClick={sendToWhatsApp}
                  className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-300"
                >
                  Send to WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;