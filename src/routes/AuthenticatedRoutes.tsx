import { CreditCard, HouseSimple } from 'phosphor-react';
import React, { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar, NavigationItem } from '../components';

import { CreditCardPage, HomePage } from '../pages';
import BalancePage from '../pages/BalancePage';

const AuthenticatedRoutes: React.FC = () => {
  const [active, setActive] = useState<any>('/');

  const onItemClickHandler = useCallback((href: string) => {
    setActive(href);
  }, []);

  return (
    <BrowserRouter>
      <NavigationBar>
        <NavigationItem
          href="/"
          onClick={onItemClickHandler}
          title={<HouseSimple weight={active === '/' ? 'fill' : 'bold'} className="w-6 h-6" />}
        />
        <NavigationItem
          href="/credit-cards"
          onClick={onItemClickHandler}
          title={<CreditCard weight={active === '/credit-cards' ? 'fill' : 'bold'} className="w-6 h-6" />}
        />
      </NavigationBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/credit-cards" element={<CreditCardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthenticatedRoutes;
