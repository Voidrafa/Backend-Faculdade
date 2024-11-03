// src/components/Footer.js

import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-white text-center py-4 mt-auto">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h1 className="logo">GEEK <span>STORE</span></h1>
          <p>Fazendo máquinas da NASA desde 2020!</p>
        </div>
        <div className="col-md-4">
          <h3>Links úteis</h3>
          <ul className="list-unstyled d-flex justify-content-center">
            <li className="me-3">Cupons</li>
            <li className="me-3">Blog Post</li>
            <li className="me-3">Políticas</li>
            <li>Trabalhe Conosco</li>
          </ul>
        </div>
        <div className="col-md-4">
          <p>&copy; 2024 GeekHunter - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
