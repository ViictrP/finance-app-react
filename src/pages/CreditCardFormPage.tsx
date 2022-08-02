import { Alert, CreditCardForm, Header } from '../components';
import React, { useCallback, useEffect, useState } from 'react';
import { CreditCard } from '../entities';
import { useAppDispatch } from '../app/hook';
import { selectUser, userActions, userApiActions } from '../store/slices/userSlice';
import { Check, X } from 'phosphor-react';
import { useSelector } from 'react-redux';

const CreditCardFormPage = () => {
  const dispatch = useAppDispatch();
  const storedUser = useSelector(selectUser);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [creditCard, setCreditCard] = useState<CreditCard>();

  const onSubmitHandler = (creditCard: CreditCard) => {
    dispatch(userApiActions.postCreditCardThunk(creditCard));
  };

  const onAlertDismiss = useCallback(() => {
    dispatch(userActions.resetCreditCardSuccessError());
  }, [success, error]);

  useEffect(() => {
    setError(storedUser.saveCreditCardError);
    setSuccess(storedUser.saveCreditCardSuccess);
  }, [storedUser.saveCreditCardSuccess, storedUser.saveCreditCardError]);

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const creditCardId = location.pathname.split('/')[2];
      const creditCard = storedUser.profile.creditCards.filter(({ id }) => creditCardId === id)[0];
      setCreditCard(creditCard);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  useEffect(() => {
    console.log(creditCard);
  }, [creditCard]);

  return (
    <>
      <div className="pb-12">
        <div className="page-container">
          <Header showBackButton={true} />
          <div className="mb-4">
            <p className="text-2xl font-bold">Adicionar novo cartão</p>
          </div>
          <CreditCardForm onSubmit={onSubmitHandler} creditCard={creditCard} />
        </div>
      </div>
      <Alert show={success ? success : error ? error : false}>
        <div className="my-2 m-auto">
          {
            success &&
            <Check size={64} weight="bold" className="text-green-500" />
          }
          {
            error &&
            <X size={64} weight="bold" className="text-red-500" />
          }
        </div>
        <p className="text-gray-600 dark:text-gray-100 text-xl font-bold py-2 px-6">
          {
            success &&
            'Cartão criado com sucesso!'
          }
          {
            error &&
            'Erro ao criar novo cartão'
          }
        </p>
        <div className="flex items-center justify-between gap-4 w-full mt-8">
          <button type="button"
                  onClick={onAlertDismiss}
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            fechar
          </button>
        </div>
      </Alert>
    </>
  );
};

export default CreditCardFormPage;
