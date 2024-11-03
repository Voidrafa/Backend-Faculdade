// src/components/Header.js
import React from 'react';
import bannerImage from '../assets/logo512.png'; // Adjust path as necessary

const Header = () => (
    <header>
        <div className="header-inner-content">
            <div className="header-bottom-side">
                <div className="header-bottom-side-left">
                    <h2>Aterrorize seus amigos com o novo Nitro V15</h2>
                    <p>Novo nitro V15 com preços de matar, seu estilo é assustador com um designe simplesmente impecável, gráficos capazes de reviver até o seu zumbi.</p>
                    <button>Ver agora &#8594;</button>
                </div>
                <div className="header-bottom-side-right">
                    <img src={bannerImage} alt="Banner" />
                </div>
            </div>
        </div>
    </header>
);

export default Header;
