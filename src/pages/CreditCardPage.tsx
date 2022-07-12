import { Header, Input } from '../components';
import { MagnifyingGlass } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import CardCarousel, { CardCarouselItem } from '../components/lib/CardCarousel';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';

const CreditCardPage = () => {
  const [creditCards, setCreditCards] = useState<CardCarouselItem[]>([
    {
      id: 1,
      title: 'Nubank',
      description: 'cartão do nubank',
      color: 'bg-purple-900'
    },
    {
      id: 2,
      title: 'Porto',
      description: 'cartão da porto',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Itaucard',
      description: 'cartão do itaú',
      color: 'bg-orange-700'
    }
  ]);
  const [filteredCards, setFilteredCards] = useState<CardCarouselItem[]>(creditCards);
  const [selected, setSelected] = useState<CardCarouselItem>(creditCards[0]);
  const searchInputRef: any = useRef(null);
  const storedUser = useSelector(selectUser);

  useEffect(() => {
    setFilteredCards(creditCards);
  }, []);

  const filterCreditCards = useCallback((searchValue: string) => {
    if (searchValue) {
      const _filteredCards = creditCards.filter((card) =>
        card.title
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredCards(_filteredCards);
    } else {
      setFilteredCards(creditCards);
    }
  }, []);

  const onCreditCardSelectedHandler = useCallback((item: CardCarouselItem) => setSelected(item), []);

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
      <div className="flex flex-col gap-4 mt-[-20px]">
        <div className="px-5">
          <p className="text-xl">Cartões</p>
        </div>
        <CardCarousel
          items={filteredCards}
          onSelect={onCreditCardSelectedHandler}
        />
        <div className="mb-4 px-5">
          <p className="text-lg font-bold">{selected?.title}</p>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-light">{selected?.description}</p>
            <p className="font-bold text-orange-500">{currencyFormatter(1589.87)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCardPage;
