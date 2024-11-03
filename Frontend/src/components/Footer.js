// src/components/Footer.js
import React from 'react';
import logo from '../assets/logo192.png'; // Adjust path as necessary

const Footer = () => (
    <footer className="gray-background">
        <div className="page-inner-content footer-content">
            <div className="download-options">
                <p>Baixe nossos aplicativos!</p>
                <p>Android e iOS</p>
                <div>
                    <img src={logo} alt="Download Android" />
                    <img src={logo} alt="Download iOS" />
                </div>
            </div>

            <div className="logo-footer">
                <h1 className="logo">GEEK <span>STORE</span></h1>
                <p>Fazendo máquinas da NASA desde 2020!</p>
            </div>

            <div className="links-footer">
                <h3>Links úteis</h3>
                <ul>
                    <li>Cupons</li>
                    <li>Blog Post</li>
                    <li>Políticas</li>
                    <li>Trabalhe Conosco</li>
                </ul>
            </div>
        </div>
        <hr className="page-inner-content" />
        <div className="page-inner-content copyright">
            <p>Coyright 2024 - GeekHunter - Todos os direitos reservados</p>
        </div>
    </footer>
);

export default Footer;
