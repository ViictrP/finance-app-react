import { CreditCard, HouseSimple, Plus } from 'phosphor-react';
import React, { useCallback, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { NavigationBar, NavigationItem } from '../components';

import { CreditCardPage, HomePage } from '../pages';
import BalancePage from '../pages/BalancePage';
import CreditCardFormPage from '../pages/CreditCardFormPage';
import TransactionFormPage from '../pages/TransactionFormPage';

const AuthenticatedRoutes: React.FC = () => {
  const [active, setActive] = useState<any>('/');
  const [showContextMenu, setShowContextMenu] = useState(false);;

  const onItemClickHandler = useCallback((href: string) => {
    setActive(href);
  }, []);

  const onShowContextClickHandler = () => setShowContextMenu(!showContextMenu);

  const onClickContextMenuItemHandler = () => setShowContextMenu(false);

  return (
    <BrowserRouter>
      {
        showContextMenu &&
        <div className="context-menu flex flex-col items-center gap-[1px]">
          <Link
            onClick={onClickContextMenuItemHandler}
            to="/credit-card-form"
            className="w-full flex flex-row items-center gap-2 h-10 bg-zinc-800 rounded-tl-lg rounded-tr-lg px-3 hover:bg-blue-800 focus:bg-blue-900 cursor-pointer">
            <Plus size={15} weight="bold" />
            <p className="text-md">cartão</p>
          </Link>
          <Link
            onClick={onClickContextMenuItemHandler}
            to="/transaction-form"
            className="w-full flex flex-row items-center gap-2 h-10 bg-zinc-800 rounded-bl-lg rounded-br-lg px-3 hover:bg-blue-800 focus:bg-blue-900 cursor-pointer">
            <Plus size={15} weight="bold" />
            <p className="text-md">transação</p>
          </Link>
        </div>
      }
      <NavigationBar>
        <NavigationItem
          href="/"
          onClick={onItemClickHandler}
          title={<HouseSimple weight={active === '/' ? 'fill' : 'bold'} className="w-6 h-6" />}
        />
        <button className="pulse-single bg-zinc-700 rounded-full m-1 p-2"
                onClick={onShowContextClickHandler}>
          <Plus className="w-8 h-8" weight="fill" />
        </button>
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
        <Route path="/credit-card-form" element={<CreditCardFormPage />} />
        <Route path="/transaction-form" element={<TransactionFormPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthenticatedRoutes;
