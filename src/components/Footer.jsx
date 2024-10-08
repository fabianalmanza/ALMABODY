import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram  }  from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ALMA</h3>
            <p>Elegant and stylish clothing for the modern woman.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-gray-300">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:text-gray-300">
                  Productos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/alma_bodys"
                className="hover:text-gray-300"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 ALMABODYS. All rights reserved.</p>
          <p>&copy; Pagina Hecha por Fabi Amanza</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
