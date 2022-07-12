import { Header, Input } from '../components';
import { MagnifyingGlass } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import CardCarousel, { CardCarouselItem } from '../components/lib/CardCarousel';

const CreditCardPage = () => {
  const [creditCards, setCreditCards] = useState<CardCarouselItem[]>([
    {
      id: 1,
      title: 'title 1',
      description: 'description 1'
    },
    {
      id: 2,
      title: 'title 2 ',
      description: 'description 2'
    },
    {
      id: 3,
      title: 'title 3',
      description: 'description 3'
    }
  ]);
  const [filteredCards, setFilteredCards] = useState<CardCarouselItem[]>(creditCards);
  const [selected, setSelected] = useState<CardCarouselItem>(creditCards[0]);
  const searchInputRef: any = useRef(null);

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
        <p className="text-xl">Cartões</p>
        <CardCarousel items={filteredCards} onSelect={onCreditCardSelectedHandler} />
        <div className="mb-4">
          <p className="text-lg font-bold">{selected?.title}</p>
          <p className="text-sm font-light">{selected?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CreditCardPage;
