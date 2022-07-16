import { ChartBar, MagnifyingGlass, ShoppingBag } from 'phosphor-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CardList, Header, Input, LineCharts } from '../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { CardItem } from '../components/lib/CardList';
import { MONTHS } from '../utils/months.enum';
import SkeletonLoading from '../components/SkeletonLoading';
import Card from '../components/lib/Card';

const HomePage = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [filteredCards, setFilteredCards] = useState<typeof cards>([]);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [expensesAmount, setExpensesAmount] = useState(0);
  const storedUser = useSelector(selectUser);
  const searchInputRef: any = useRef(null);
  const TODAY = new Date();

  const filterTransactions = useCallback((searchValue: string) => {
    if (searchValue) {
      const _filteredCards = cards.filter((card) =>
        card.content
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredCards(_filteredCards);
    } else {
      setFilteredCards(cards);
    }
  }, [cards]);

  const onSearchFocus = useCallback(() => {
    searchInputRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const _transactions = storedUser.profile?.transactions.map(transaction => ({
        key: transaction.id,
        header: transaction.category,
        content: transaction.description,
        footer: currencyFormatter(transaction.amount)
      }));
      const debitAmount = storedUser.profile?.transactions.reduce((sum, current) => sum + Number(current.amount), 0);
      const creditCardsAmount = storedUser.profile?.creditCards.reduce((sum, current) => {
        const invoice = current.invoices.filter(invoice => invoice.month === MONTHS[TODAY.getMonth()])[0];
        const amount = invoice.transactions.reduce((sum, current) => {
          return sum + Number(current.amount);
        }, 0);
        return sum + Number(amount);
      }, 0);
      setCards(_transactions);
      setExpensesAmount(debitAmount + creditCardsAmount);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  useEffect(() => {
    if (storedUser.profile) {
      const balance = storedUser.profile.salary - expensesAmount;
      setAvailableBalance(Number(balance.toFixed(2)));
    }
  }, [storedUser.profile, expensesAmount]);

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  return (
    <div className="page-container">
      <Header />
      <div className="flex flex-row items-center gap-1">
        <span className="font-light text-md">{storedUser.isLoadingProfile ?
          <SkeletonLoading width={60} /> : 'salário'}</span>
        {
          storedUser.isLoadingProfile ?
            <SkeletonLoading width={100} /> :
            <span
              className="p-[2px] text-md font-bold text-blue-400 rounded-md"> {currencyFormatter(storedUser.profile?.salary ?? 0)}</span>
        }
      </div>
      <div
        id="content"
        className="mt-4 w-full h-auto bg-white dark:bg-zinc-900 rounded-lg border-[0.5px] border-zinc-200 dark:border-zinc-700 drop-shadow">
        <div id="balance-container" className="p-4 w-full">
          <div className="w-full flex flex-row items-center justify-between">
            {storedUser.isLoadingProfile ?
              <>
                <SkeletonLoading width={100} />
                <SkeletonLoading width={24} />
              </> :
              <>
                <p className="text-lg">{storedUser.isLoadingProfile ?
                  <SkeletonLoading width={100} /> : 'saldo disponível'}</p>
                <Link to="/">
                  <button title="gear" type="button" className="pulse-single">
                    <ChartBar size={24} weight="fill" className="text-zinc-900 dark:text-white" />
                  </button>
                </Link>
              </>
            }

          </div>
          <h1 className="text-3xl text-emerald-500 font-bold">
            {storedUser.isLoadingProfile ? <SkeletonLoading width={100} /> : currencyFormatter(availableBalance)}
          </h1>
        </div>
        <div id="charts">
          { storedUser.isLoadingProfile ?
            <div className="flex items-center w-full p-4">
              <SkeletonLoading width={280} height={70}/>
            </div>
            :
            <div className="w-full h-[160px]">
              <LineCharts labels={['Jan', 'Fev', 'Mar', 'Mai', 'Jun', 'Jul']}
                          data={[3390.83, 5332.29, 850.23, 4110.22, 4422.11, 6500.98, 10890.10]} />
            </div>
          }
        </div>
        <div className="p-4 w-full text-right border-t-[0.5px] border-zinc-200 dark:border-zinc-800">
          <p className="text-md">{storedUser.isLoadingProfile ?
            <SkeletonLoading width={120} /> : 'gasto total • jun'}</p>
          <p className="text-xl text-orange-300 font-bold">{
            storedUser.isLoadingProfile ? <SkeletonLoading width={100} /> : currencyFormatter(expensesAmount)
          }</p>
        </div>
      </div>
      <div id="transitions" className="mt-10 pb-4">
        <h1 className="text-2xl font-bold my-5">{storedUser.isLoadingProfile ?
          <SkeletonLoading width={120} /> : 'Transações'}</h1>
        {!storedUser.isLoadingProfile ?
          <>
            <Input
              customRef={searchInputRef}
              placeholder="buscar transações..."
              icon={<MagnifyingGlass size={24} className="text-zinc-900 dark:text-white" />}
              onChange={filterTransactions}
              onFocus={onSearchFocus}
            />
            <CardList
              content={filteredCards}
              icon={<ShoppingBag size="30" weight="fill" />}
            />
          </>
          :
          <>
            <SkeletonLoading width={330} height={60} />
            <Card>
              <SkeletonLoading width={30} height={25} />
              <div className="w-full flex flex-col">
                <div className="w-full flex flex-row items-start justify-between">
                  <SkeletonLoading width={45} />
                  <SkeletonLoading width={30} />
                </div>
                <SkeletonLoading width={150} />
              </div>
            </Card>
          </>
        }
      </div>
    </div>
  );
};

export default HomePage;
