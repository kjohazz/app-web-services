// Navigation.jsx (ejemplo de componente genérico)
import React from 'react';
import './Navigation.css';

function Navigation({ links }) {
    return (
        <nav className="navigation">
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link.url}>{link.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;
