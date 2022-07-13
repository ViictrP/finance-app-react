import { CardList, Header, Input } from '../components';
import { MagnifyingGlass, Pencil, ShoppingBag } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import CardCarousel, { CardCarouselItem } from '../components/lib/CardCarousel';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';

const CreditCardPage = () => {
  const [creditCards, setCreditCards] = useState<CardCarouselItem[]>();
  const [transactions, setTransactions] = useState([
    {
      key: '1',
      header: 'outras transferências',
      content: 'pix transf victor 18/06',
      footer: currencyFormatter(300.00)
    },
    {
      key: '2',
      header: 'restaurante',
      content: 'outback aricanduva 11/06',
      footer: currencyFormatter(250.66)
    },
    {
      key: '3',
      header: 'outros',
      content: 'pix transf Vinicius 18/06',
      footer: currencyFormatter(3250.80)
    },
    {
      key: '4',
      header: 'restaurante',
      content: 'Dipz Potato 07/07',
      footer: currencyFormatter(125.90)
    }
  ]);
  const [filteredCards, setFilteredCards] = useState<CardCarouselItem[]>();
  const [filteredTransactions, setFilteredTransactions] = useState<typeof transactions>([]);
  const [selected, setSelected] = useState<CardCarouselItem>();
  const searchInputRef: any = useRef(null);
  const searchTransactionInputRef: any = useRef(null);
  const storedUser = useSelector(selectUser);

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const _creditCards: any = storedUser.profile?.creditCards.map(creditCard => ({
        id: creditCard.id,
        title: creditCard.title,
        description: creditCard.description,
        color: creditCard.backgroundColor
      }));
      setCreditCards(_creditCards);
      setFilteredCards(_creditCards);
      setFilteredTransactions(transactions);
      setSelected(_creditCards[0]);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  const filterCreditCards = useCallback((searchValue: string) => {
    if (searchValue) {
      const _filteredCards = creditCards?.filter((card) =>
        card.title
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredCards(_filteredCards);
    } else {
      setFilteredCards(creditCards);
    }
  }, [creditCards]);

  const filterTransactions = useCallback((searchValue: string) => {
    if (searchValue) {
      const _filteredTransactions = transactions.filter((card) =>
        card.content
          .toLowerCase()
          .includes(searchValue.toLowerCase())
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
          <div className="px-5 mb-4">
            <p className="text-xl">Cartões</p>
          </div>
          <CardCarousel
            items={filteredCards ?? []}
            onSelect={onCreditCardSelectedHandler}
          />
        </div>

        <div className="mb-4 px-5">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-bold">{selected?.title}</p>
            <div className="flex flex-1 flex-row items-center justify-end gap-4">
              <button className="pulse-single">
                <Pencil size={20} weight="fill" />
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-light">{selected?.description}</p>
            <p className="font-bold text-orange-500">{currencyFormatter(1589.87)}</p>
          </div>
          <div id="transitions" className="mt-5">
            <Input
              customRef={searchTransactionInputRef}
              placeholder={`transações do cartão ${selected?.title}...`}
              icon={<MagnifyingGlass size={24} />}
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
    </>
  );
};

export default CreditCardPage;
