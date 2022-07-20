import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { useCallback, useEffect, useState } from 'react';
import CardCarousel, { CardCarouselItem } from '../components/lib/CardCarousel';
import { Header, TransactionForm } from '../components';

const TransactionFormPage = () => {
  const storedUser = useSelector(selectUser);
  const [carouselItems, setCarouselItems] = useState<CardCarouselItem[]>();
  const [selected, setSelected] = useState<CardCarouselItem>();

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const _carouselItems: any = storedUser.profile?.creditCards.map(creditCard => ({
        id: creditCard.id,
        title: creditCard.title,
        description: creditCard.description,
        color: creditCard.backgroundColor,
      }));
      setCarouselItems(_carouselItems);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  const onCreditCardSelectedHandler = useCallback((item: CardCarouselItem) => {
    setSelected(item);
  }, [carouselItems]);

  const onSubmitHandler = useCallback(() => {
    console.log('submited');
  }, []);

  return (
    <div className="pb-12">
      <div className="page-container">
        <Header />
      </div>
      <div className="mt-[-48px]">
        <div className="px-5 mb-4">
          <p className="text-2xl font-bold">Cartões</p>
        </div>
        <CardCarousel
          items={carouselItems ?? []}
          onSelect={onCreditCardSelectedHandler}
        />
      </div>
      <div className="page-container flex flex-col gap-4 mt-5">
        <div>
          <p className="text-xl font-bold">Adicionar transação</p>
          <span className="font-light">no cartão <span className="font-bold">{selected?.title}</span></span>
        </div>
        <TransactionForm onSubmit={onSubmitHandler} />
      </div>
    </div>
  );
};

export default TransactionFormPage;
