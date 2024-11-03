// src/components/Navbar.js
import React from 'react';
import logo from '../assets/logo192.png'; // Adjust path as necessary

const Navbar = () => (
    <div className="navbar show-menu">
        <div className="header-inner-content">
            <h1 className="logo">GEEK <span>STORE</span></h1>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Produtos</li>
                    <li>Sobre</li>
                    <li>Contato</li>
                    <li>Conta</li>
                </ul>
            </nav>
            <div className="nav-icon-container">
                <img src={logo} alt="logo" />
                <img src={logo} alt="menu" className="menu-button" />
            </div>
        </div>
    </div>
);

export default Navbar;
