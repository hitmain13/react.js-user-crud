import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-notifications/lib/notifications.css';
import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Logo from '../components/template/Logo.jsx'
import Nav from '../components/template/Nav.jsx'
import Routes from './Routes.jsx';
import Footer from '../components/template/Footer.jsx'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>