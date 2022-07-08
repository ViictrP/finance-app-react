import { Gear, MagnifyingGlass, ShoppingBag } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { CardList, Header, Input } from '../components';
import { Link } from 'react-router-dom';
import LineCharts from '../components/LineCharts';

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
      footer: '- R$ 300,00',
    },
    {
      key: '2',
      header: 'outras transferências',
      content: 'pix transf binho 18/06',
      footer: '- R$ 300,00',
    },
    {
      key: '3',
      header: 'outras transferências',
      content: 'pix transf nathalia 18/06',
      footer: '- R$ 300,00',
    },
    {
      key: '4',
      header: 'outras transferências',
      content: 'pix transf theo 18/06',
      footer: '- R$ 300,00',
    },
  ]);
  const [filteredCards, setFilteredCards] = useState<typeof cards>([]);

  useEffect(() => {
    const div = document.getElementById('balance-container');
    const container: BalanceContainer = {
      width: div!.clientWidth + 30 ?? 0,
      height: 100,
    };
    setBalanceContainer(container);
    setFilteredCards(cards);
  }, []);

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
      <div
        id="content"
        className="block mt-10 w-full h-auto bg-zinc-900 rounded-lg"
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
          <h1 className="text-3xl text-emerald-500 font-bold">
            R$ 3.423,18
          </h1>
        </div>
        <div id="charts">
          <div className="w-full h-[160px]">
            <LineCharts labels={['Jan', 'Fev', 'Mar', 'Mai', 'Jun', 'Jul']} data={[3390.83, 5332.29, 850.23, 4110.22, 4422.11, 6500.98, 10890.10]} />
          </div>
        </div>
        <div className="p-4 w-full text-right">
          <p className="text-md">gasto total • jun</p>
          <p className="text-xl text-orange-300 font-bold">R$ 7.364,50</p>
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
