import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AppRoutes from './routes';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <Router>
        <ProductProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header onSearch={handleSearch} />
          <div className="pt-16">
            <AppRoutes searchTerm={searchTerm} />
            <Cart />
            <Footer />
          </div>
          <button
            onClick={() => window.open('https://wa.link/q0mj0o', '_blank')}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
          <ToastContainer
            className="top-16" // Ajusta la posición
            toastClassName="bg-white text-black rounded-md p-2 shadow-md mb-2 w-50 h-30 text-sm" // Estilo y tamaño de las alertas
            bodyClassName="text-xs" // Tamaño de texto pequeño
            progressClassName="bg-black" // Estilo de la barra de progreso
            autoClose={2000} // Duración de la alerta en milisegundos (1 segundo)
          />
        </div>
      </CartProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;
