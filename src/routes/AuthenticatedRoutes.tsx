import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/home/home-page';
import CreditCardPage from 'pages/credit-card-page/credit-card-page';
import { useAuth } from 'auth/context';
import { NavigationBar, NavigationItem } from '../components';
import { HiLogout, HiHome, HiCreditCard } from 'react-icons/hi';


const AuthenticatedRoutes: React.FC = () => {
  const { logout } = useAuth();

  const noop = () => {
    console.log('noop');
  }

  return (
    <BrowserRouter>
      <NavigationBar>
        <NavigationItem onClick={noop} title={<HiHome />} />
        <NavigationItem onClick={noop} title={<HiCreditCard />} />
        <NavigationItem onClick={logout} title={<HiLogout />} />
      </NavigationBar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/credit-cards' element={<CreditCardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthenticatedRoutes;
