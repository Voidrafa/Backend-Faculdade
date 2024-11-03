// src/components/Navbar.js

import React from 'react';

const Navbar = () => {
    return (
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
                    <img src="logo192.png" alt="logo" />
                    <img src="src/assets/logo192.png" className="menu-button" alt="menu" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
