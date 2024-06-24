// src/components/Footer/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <a href="/" className="text-white hover:text-gray-400 mx-2">Home</a>
          <a href="/about" className="text-white hover:text-gray-400 mx-2">About</a>
          <a href="/contact" className="text-white hover:text-gray-400 mx-2">Contact</a>
        </div>
        <div className="mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 mx-2">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 mx-2">Twitter</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 mx-2">LinkedIn</a>
        </div>
        <p>&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
