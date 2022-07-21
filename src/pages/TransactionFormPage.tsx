import { useSelector } from 'react-redux';
import { selectUser, userApiActions } from '../store/slices/userSlice';
import { useCallback, useEffect, useState } from 'react';
import CardCarousel, { CardCarouselItem } from '../components/lib/CardCarousel';
import { Header, TransactionForm } from '../components';
import { Transaction } from '../entities';
import { useAppDispatch } from '../app/hook';

const TransactionFormPage = () => {
  const storedUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const [carouselItems, setCarouselItems] = useState<CardCarouselItem[]>();
  const [selected, setSelected] = useState<CardCarouselItem>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onCreditCardSelectedHandler = useCallback((item: CardCarouselItem) => {
    setSelected(item);
  }, [carouselItems]);

  const onSubmitHandler = useCallback((transaction: Transaction) => {
    const creditCard = storedUser.profile!.creditCards.filter(creditCard => creditCard.id === selected!.id)[0];
    transaction.isInstallment = transaction.installmentAmount !== undefined && transaction.installmentAmount > 1;
    transaction.installmentAmount = transaction.installmentAmount === undefined ? 0 : transaction.installmentAmount;
    transaction.invoice = {
      creditCard: { id: creditCard.id },
    } as any;
    dispatch(userApiActions.postTransactionThunk(transaction));
  }, [storedUser.profile, selected]);

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

  useEffect(() => {
    setError(storedUser.saveTransactionError);
    setSuccess(storedUser.saveTransactionSuccess);
  }, [storedUser.saveTransactionSuccess, storedUser.saveTransactionError]);

  return (
    <>
      {error && <p>error</p>}
      {success && <p>success</p>}
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
    </>
  );
};

export default TransactionFormPage;
