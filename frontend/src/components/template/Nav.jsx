import './Nav.css';
import React from 'react';
import NavItem from './NavItem';

export default () =>
    <aside className="menu-area">
        <nav className="menu">
            <NavItem icon='home' title="Início"/>
            <NavItem icon='users' title="Usuários" link="users"/>
        </nav>
    </aside>