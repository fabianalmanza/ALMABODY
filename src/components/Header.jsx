import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCart } from '../CartContext';

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount, toggleCart } = useCart();

  return (
    <header className="bg-black text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">ALMA</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Inicio</Link>
          <Link to="/catalog" className="hover:text-gray-300">Catálogo</Link>
          <a href="#" className="hover:text-gray-300">Sale</a>
          <a href="#" className="hover:text-gray-300">New/Arrival</a>
          <a href="#" className="hover:text-gray-300">About</a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 text-white px-3 py-1 rounded-full"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button onClick={toggleCart} className="relative">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block hover:text-gray-300">Inicio</Link>
          <Link to="/catalog" className="block hover:text-gray-300">Catálogo</Link>
          <a href="#" className="block hover:text-gray-300">Sale</a>
          <a href="#" className="block hover:text-gray-300">New/Arrival</a>
          <a href="#" className="block hover:text-gray-300">About</a>
        </div>
      )}
    </header>
  );
};

export default Header;