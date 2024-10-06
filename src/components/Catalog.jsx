import React from 'react';

const Catalog = () => {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestro Catálogo</h1>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src="https://heyzine.com/flip-book/c2049e4257"
          title="ALMA Catálogo"
          className="w-full h-screen border-none"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Catalog;