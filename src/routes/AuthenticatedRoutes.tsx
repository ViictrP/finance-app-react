import { CreditCard, HouseSimple, Plus } from 'phosphor-react';
import React, { useCallback, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ContextMenu, NavigationBar, NavigationItem } from '../components';

import {
  BalancePage,
  CreditCardFormPage,
  CreditCardPage,
  HomePage, StatisticsPage,
  TransactionFormPage,
  TransactionPage
} from '../pages';
import InvoicePage from '../pages/InvoicePage';

const AuthenticatedRoutes: React.FC = () => {
  const [active, setActive] = useState<any>('/');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onItemClickHandler = useCallback((href: string) => {
    setActive(href);
  }, []);

  const onShowContextClickHandler = ({ x, y }: any) => {
    setPosition(prevState => ({ ...prevState, x: x + 33, y: y + 10 }));
    setShowContextMenu(!showContextMenu);
  };

  const onClickContextMenuItemHandler = () => setShowContextMenu(false);

  return (
    <BrowserRouter>
      <ContextMenu show={showContextMenu} position={position} showChevron={true}>
        <Link
          onClick={onClickContextMenuItemHandler}
          to="/credit-card-form"
          className="w-full flex flex-row items-center gap-2 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-tl-lg rounded-tr-lg px-3 hover:bg-blue-500 dark:hover:bg-blue-800 focus:bg-blue-500 dark:focus:bg-blue-900 cursor-pointer">
          <Plus size={15} weight="bold" />
          <p className="text-md">cartão</p>
        </Link>
        <Link
          onClick={onClickContextMenuItemHandler}
          to="/transaction-form"
          className="w-full flex flex-row items-center gap-2 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-bl-lg rounded-br-lg px-3 hover:bg-blue-500 dark:hover:bg-blue-800 focus:bg-blue-500 dark:focus:bg-blue-900 cursor-pointer">
          <Plus size={15} weight="bold" />
          <p className="text-md">transação</p>
        </Link>
      </ContextMenu>
      <NavigationBar>
        <NavigationItem
          href="/"
          onClick={onItemClickHandler}
          title={<HouseSimple weight={active === '/' ? 'fill' : 'bold'} className="w-6 h-6 text-zinc-900 dark:text-white" />}
        />
        <button className="pulse-single bg-zinc-200 dark:bg-zinc-700 border-[0.5px] dark:border-zinc-600 rounded-full m-1 p-2"
                onClick={event => onShowContextClickHandler(event.currentTarget.getBoundingClientRect())}>
          <Plus className="w-8 h-8 text-zinc-900 dark:text-white" weight="fill" />
        </button>
        <NavigationItem
          href="/credit-cards"
          onClick={onItemClickHandler}
          title={<CreditCard weight={active === '/credit-cards' ? 'fill' : 'bold'} className="w-6 h-6 text-zinc-900 dark:text-white" />}
        />
      </NavigationBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/credit-cards" element={<CreditCardPage />} />
        <Route path="/credit-card-form" element={<CreditCardFormPage />} />
        <Route path="/credit-card-form/:creditCardId" element={<CreditCardFormPage />} />
        <Route path="/transaction-form" element={<TransactionFormPage />} />
        <Route path="/transactions/:id" element={<TransactionPage />} />
        <Route path="/invoices/:creditCardId" element={<InvoicePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthenticatedRoutes;
