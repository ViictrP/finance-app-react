import { CardList, ContextMenu, Header, Input } from '../components';
import { List, MagnifyingGlass, Pencil, ShoppingBag, Trash } from 'phosphor-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CardCarousel, { CardCarouselItem } from '../components/lib/CardCarousel';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { CardItem } from '../components/lib/CardList';
import { MONTHS } from '../utils/months.enum';
import { CreditCard } from '../entities';
import CreditCardSkeletonPage from './CreditCardSkeletonPage';

const CreditCardPage = () => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>();
  const [transactions, setTransactions] = useState<CardItem[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardCarouselItem[]>();
  const [filteredTransactions, setFilteredTransactions] = useState<typeof transactions>([]);
  const [selected, setSelected] = useState<CardCarouselItem>();
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const searchInputRef: any = useRef(null);
  const searchTransactionInputRef: any = useRef(null);
  const storedUser = useSelector(selectUser);
  const TODAY = new Date();

  const filterCreditCards = useCallback((searchValue: string) => {
    if (searchValue) {
      const _filteredCards = creditCards?.filter((card) =>
        card.title
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
      setFilteredCards(mapCreditCardToCardCarouselItem(_filteredCards as any));
    } else {
      setFilteredCards(creditCards as any);
    }
  }, [creditCards]);

  const filterTransactions = useCallback((searchValue: string) => {
    if (searchValue) {
      const _filteredTransactions = transactions.filter((card) =>
        card.content
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
      setFilteredTransactions(_filteredTransactions);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions]);

  const onSearchFocus = useCallback(() => {
    searchTransactionInputRef.current.scrollIntoView();
  }, [transactions]);

  const onCreditCardSelectedHandler = useCallback((item: CardCarouselItem) => {
    setSelected(item);
  }, [creditCards]);

  const mapCreditCardToCardCarouselItem = useCallback((_creditCards: CreditCard[]) => {
    return _creditCards.map(creditCard => ({
      id: creditCard.id,
      title: creditCard.title,
      description: creditCard.description,
      color: creditCard.backgroundColor,
    }));
  }, [creditCards]);

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const _creditCards = storedUser.profile.creditCards;
      setCreditCards(_creditCards);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  useEffect(() => {
    if (creditCards?.length) {
      const _creditCards: any = mapCreditCardToCardCarouselItem(creditCards);
      setSelected(_creditCards[0]);
      setFilteredCards(_creditCards);
    }
  }, [creditCards]);

  useEffect(() => {
    if (selected && creditCards) {
      const creditCard = creditCards.filter(creditCard => creditCard.id === selected.id)[0];
      const month = MONTHS[TODAY.getMonth()];
      const invoice = creditCard.invoices.filter(invoice => invoice.month === month)[0];
      const _transactions = invoice.transactions.map(transaction => ({
        key: transaction.id,
        header: transaction.category,
        content: transaction.description,
        footer: currencyFormatter(transaction.amount),
      }));
      const _invoiceAmount = invoice.transactions.reduce((sum, current) => sum + Number(current.amount), 0);
      setInvoiceAmount(_invoiceAmount);
      setTransactions(_transactions);
      setFilteredTransactions(_transactions);
    }
  }, [selected, creditCards]);

  if (storedUser.isLoadingProfile) {
    return <CreditCardSkeletonPage />
  }

  return (
    <>
      <div className="page-container">
        <Header />
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold">Filtrar seus cartões</p>
          <Input
            customRef={searchInputRef}
            placeholder="buscar cartões..."
            icon={<MagnifyingGlass size={24} />}
            onChange={filterCreditCards}
          />
        </div>
      </div>
      <div className="flex flex-col pb-12 gap-8 mt-[-20px]">
        <div>
          <div className="px-3 mb-4">
            <p className="text-xl">Cartões</p>
          </div>
          <CardCarousel
            items={filteredCards ?? []}
            onSelect={onCreditCardSelectedHandler}
          />
        </div>

        <div className="mb-4 px-3">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-bold">{selected?.title}</p>
            <div className="flex flex-1 flex-row items-center justify-end gap-4">
              <button className="pulse-single" onClick={event => {
                const {x, y} = event.currentTarget.getBoundingClientRect();
                setContextMenuPosition({ x: x - 105, y: y + 20 });
                setShowContextMenu(!showContextMenu);
              }}>
                <List size={20} weight="fill" className="text-zinc-900 dark:text-white" />
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-light">{selected?.description}</p>
            <p className="font-bold text-orange-500">{currencyFormatter(invoiceAmount)}</p>
          </div>
          <div id="transitions" className="mt-5">
            <Input
              customRef={searchTransactionInputRef}
              placeholder={`transações do cartão ${selected?.title}...`}
              icon={<MagnifyingGlass size={24} className="text-zinc-900 dark:text-white" />}
              onChange={filterTransactions}
              onFocus={onSearchFocus}
            />
            <CardList
              content={filteredTransactions}
              icon={<ShoppingBag size="30" className="mr-4 ml-1" weight="fill" />}
            />
          </div>
        </div>
      </div>
      <ContextMenu show={showContextMenu} position={contextMenuPosition}>
        <div
          onClick={() => setShowContextMenu(false)}
          className="w-full flex flex-row items-center gap-2 h-10 bg-zinc-900 rounded-tl-lg rounded-tr-lg px-3 hover:bg-blue-800 focus:bg-blue-900 cursor-pointer">
          <Pencil size={15} weight="bold" />
          <p className="text-md">editar</p>
        </div>
        <div
          onClick={() => setShowContextMenu(false)}
          className="w-full flex flex-row items-center gap-2 h-10 bg-zinc-900 rounded-bl-lg rounded-br-lg px-3 hover:bg-blue-800 focus:bg-blue-900 cursor-pointer">
          <Trash size={15} weight="bold" />
          <p className="text-md">excluir</p>
        </div>
      </ContextMenu>
    </>
  );
};

export default CreditCardPage;
