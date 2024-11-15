import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = Math.round(
    cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
  );

  const sendToWhatsApp = () => {
    const message = `¡Hola! Me gustaría ordenar los siguientes productos:\n\n${cartItems
      .map(item => `${item.name} (${item.selectedColor}) (x${item.quantity || 1}) - $${Math.round(item.price * (item.quantity || 1))}`)
      .join('\n')}\n\nTotal: $${total}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/573176599949/?text=${encodedMessage}`, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tu Carrito</h2>
            <button onClick={toggleCart}>
              <X size={24} />
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{item.selectedColor}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedColor, (item.quantity || 1) - 1)}
                      className="p-1"
                      disabled={(item.quantity || 1) <= 1} // Desactiva si la cantidad es 1
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2">{item.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedColor, (item.quantity || 1) + 1)}
                      className="p-1"
                    >
                      <Plus size={16} />
                    </button>
                    <button onClick={() => removeFromCart(item.id, item.selectedColor)} className="ml-4 text-red-500">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-8">
                <p className="text-xl font-bold mb-4">Total: ${total}</p>
                <button
                  onClick={sendToWhatsApp}
                  className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-300 mb-2"
                >
                  Enviar Pedido por WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  Vaciar Carrito
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
