import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import AppRoutes from './routes';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhatsAppButton from './components/WhatsAppButton';

const App = () => {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="pt-16">
              <AppRoutes />
              <Cart />
              <Footer />
            </div>
            <WhatsAppButton />
            <ToastContainer
              className="top-16"
              toastClassName="bg-white text-black rounded-md p-2 shadow-md mb-2 w-50 h-30 text-sm"
              bodyClassName="text-xs"
              progressClassName="bg-black"
              autoClose={2000}
            />
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;
