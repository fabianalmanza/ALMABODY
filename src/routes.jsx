import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import Productos from './components/Productos';

const AppRoutes = ({ addToCart, searchTerm }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <ProductGrid addToCart={addToCart} searchTerm={searchTerm} />
          </>
        }
      />
      <Route path="/catalog" element={<Catalog />} />
      <Route
        path="/product/:id"
        element={<ProductDetail addToCart={addToCart} />}
      />
      <Route path="/productos" element={<Productos />} />
    </Routes>
  );
};

export default AppRoutes;