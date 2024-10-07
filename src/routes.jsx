import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail'; // Importamos el componente de detalles

const AppRoutes = ({ addToCart, searchTerm }) => {
  return (
    <Routes>
      {/* Ruta principal con Hero y ProductGrid */}
      <Route path="/" element={
        <>
          <Hero />
          <ProductGrid addToCart={addToCart} searchTerm={searchTerm} />
        </>
      } />
      
      {/* Ruta para el catálogo */}
      <Route path="/catalog" element={<Catalog />} />

      {/* Ruta dinámica para el detalle del producto */}
      <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
    </Routes>
  );
};

export default AppRoutes;
