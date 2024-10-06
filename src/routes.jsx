import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Catalog from './components/Catalog';

const AppRoutes = ({ addToCart, searchTerm }) => {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Hero />
          <ProductGrid addToCart={addToCart} searchTerm={searchTerm} />
        </>
      } />
      <Route path="/catalog" element={<Catalog />} />
    </Routes>
  );
};

export default AppRoutes;