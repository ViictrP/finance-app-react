import { Gear, MagnifyingGlass, ShoppingBag } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { CardList, Header, Input } from '../components';
import { Link } from 'react-router-dom';
import LineCharts from '../components/LineCharts';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';

interface BalanceContainer {
  width: number;
  height: number;
}

const HomePage = () => {
  const [balanceContainer, setBalanceContainer] = useState<BalanceContainer>();
  const [cards, setCards] = useState([
    {
      key: '1',
      header: 'outras transferências',
      content: 'pix transf victor 18/06',
      footer: currencyFormatter(300.00),
    },
    {
      key: '2',
      header: 'restaurante',
      content: 'outback aricanduva 11/06',
      footer: currencyFormatter(250.66),
    },
    {
      key: '3',
      header: 'outros',
      content: 'pix transf Vinicius 18/06',
      footer: currencyFormatter(3250.80),
    },
    {
      key: '4',
      header: 'restaurante',
      content: 'Dipz Potato 07/07',
      footer: currencyFormatter(125.90),
    },
  ]);
  const [filteredCards, setFilteredCards] = useState<typeof cards>([]);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const expensesAmount = 7364.50;
  const storedUser = useSelector(selectUser);

  useEffect(() => {
    const div = document.getElementById('balance-container');
    const container: BalanceContainer = {
      width: div!.clientWidth + 30 ?? 0,
      height: 100,
    };
    setBalanceContainer(container);
    setFilteredCards(cards);
  }, []);

  useEffect(() => {
    if (storedUser.profile) {
      const balance = storedUser.profile.salary - expensesAmount;
      setAvailableBalance(Number(balance.toFixed(2)));
    }
  }, [storedUser.profile]);

  const filterTransactions = (searchValue: string) => {
    if (searchValue) {
      const _filteredCards = cards.filter((card) =>
        card.content
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
      setFilteredCards(_filteredCards);
    } else {
      setFilteredCards(cards);
    }
  };

  return (
    <div className="page-container">
      <Header />
      {
        storedUser.isLoadingProfile ? <span>loading...</span> :
          <>
            salário
            <span
              className="p-[2px] text-sm font-bold text-blue-400 rounded-md"> {currencyFormatter(storedUser.profile?.salary ?? 0)}</span>
          </>
      }
      <div
        id="content"
        className="mt-4 w-full h-auto bg-zinc-900 rounded-lg"
      >
        <div id="balance-container" className="p-4 w-full">
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-lg">saldo disponível</p>
            <Link to="/balance">
              <button title="gear" type="button" className="pulse-single">
                <Gear size={24} weight="fill" />
              </button>
            </Link>
          </div>
          <h1 className="text-3xl text-emerald-500 font-bold">{currencyFormatter(availableBalance)}</h1>
        </div>
        <div id="charts">
          <div className="w-full h-[160px]">
            <LineCharts labels={['Jan', 'Fev', 'Mar', 'Mai', 'Jun', 'Jul']}
                        data={[3390.83, 5332.29, 850.23, 4110.22, 4422.11, 6500.98, 10890.10]} />
          </div>
        </div>
        <div className="p-4 w-full text-right">
          <p className="text-md">gasto total • jun</p>
          <p className="text-xl text-orange-300 font-bold">{currencyFormatter(expensesAmount)}</p>
        </div>
      </div>
      <div id="transitions" className="mt-10">
        <h1 className="text-2xl font-bold my-5">Transações</h1>
        <Input
          placeholder="buscar transações..."
          icon={<MagnifyingGlass size={24} />}
          onChange={filterTransactions}
        />
        <CardList
          content={filteredCards}
          icon={<ShoppingBag size="30" className="mr-4 ml-1" weight="fill" />}
        />
      </div>
    </div>
  );
};

export default HomePage;
