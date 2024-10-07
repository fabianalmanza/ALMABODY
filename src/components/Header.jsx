import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../CartContext';

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItemCount, toggleCart } = useCart();
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isMenuOpen) {
      timer = setTimeout(() => {
        setIsMenuOpen(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current.focus();
      // Iniciar el temporizador cuando se abre el input (ya que está vacío inicialmente)
      startCloseTimer();
    }
  }, [isSearchOpen]);

  // Función para iniciar el temporizador de cierre
  const startCloseTimer = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      if (searchTerm === '') {
        setIsSearchOpen(false);
      }
    }, 3000);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen) {
      setSearchTerm('');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);

    // Limpiar cualquier temporizador existente
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Si el valor está vacío, iniciar el temporizador de cierre
    if (value === '') {
      startCloseTimer();
    }
  };

  // Limpiar el timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="bg-black text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center space-x-4">
            <button className="md:hidden" onClick={handleMenuToggle}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="hover:text-gray-300"
                onClick={handleMenuItemClick}
              >
                Inicio
              </Link>
              <Link
                to="/catalog"
                className="hover:text-gray-300"
                onClick={handleMenuItemClick}
              >
                Catálogo
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to="/"
              className="hover:text-gray-300"
              onClick={handleMenuItemClick}
            >
              <div className="text-2xl font-bold purple-purse-regular">
                ALMA
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <div className="relative flex items-center">
              <button onClick={handleSearchToggle} className="text-white">
                {isSearchOpen ? <X size={24} /> : <Search size={24} />}
              </button>
              {isSearchOpen && (
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  className="bg-white text-black px-3 py-1 rounded-full w-40 ml-2"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              )}
            </div>
            <button onClick={toggleCart} className="relative">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 container mx-auto">
          <Link
            to="/"
            className="block hover:text-gray-300"
            onClick={handleMenuItemClick}
          >
            Inicio
          </Link>
          <Link
            to="/catalog"
            className="block hover:text-gray-300"
            onClick={handleMenuItemClick}
          >
            Catálogo
          </Link>
          <Link
            to="/productos"
            className="block hover:text-gray-300"
            onClick={handleMenuItemClick}
          >
            Productos
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
