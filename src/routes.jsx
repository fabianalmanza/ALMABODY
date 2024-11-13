// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import Productos from './components/Productos';
import InstagramFeed from './components/InstagramFeed'; // Asegúrate de importar el componente

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <ProductGrid />
            <InstagramFeed />
          </>
        }
      />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/productos" element={<Productos />} />
    </Routes>
  );
};

export default AppRoutes;
