import { useSelector } from 'react-redux';
import { selectUser, userActions, userApiActions } from '../store/slices/userSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Dropdown, Header, TransactionForm } from '../components';
import { CreditCard, Transaction } from '../entities';
import { useAppDispatch } from '../app/hook';
import { DropdownOption } from '../components/lib/Dropdown';
import { Check, X } from 'phosphor-react';

const TransactionFormPage = () => {
  const storedUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const [dropDownItems, setDropDownItems] = useState<DropdownOption[]>([]);
  const [selected, setSelected] = useState<CreditCard>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onCreditCardSelectedHandler = useCallback((creditCardId: string) => {
    const creditCard = storedUser.profile!.creditCards.filter(creditCard => creditCard.id === creditCardId)[0];
    setSelected(creditCard);
  }, [dropDownItems]);

  const onSubmitHandler = useCallback((transaction: Transaction) => {
    transaction.isInstallment = transaction.installmentAmount !== undefined && transaction.installmentAmount > 1;
    transaction.installmentAmount = transaction.installmentAmount === undefined ? 1 : transaction.installmentAmount;
    if (selected) {
      const creditCard = storedUser.profile!.creditCards.filter(creditCard => creditCard.id === selected.id)[0];
      transaction.invoice = {
        creditCard: { id: creditCard.id }
      } as any;
    }
    dispatch(userApiActions.postTransactionThunk(transaction));
  }, [storedUser.profile, selected]);

  const onAlertDismiss = useCallback(() => {
    dispatch(userActions.resetTransactionSuccessError());
  }, [success, error]);

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const _dropdownItems: any = storedUser.profile?.creditCards.map(creditCard => ({
        value: creditCard.id,
        title: creditCard.title
      }));
      setDropDownItems(_dropdownItems);
    }
  }, [storedUser.profile, storedUser.isLoadingProfile]);

  useEffect(() => {
    setError(storedUser.saveTransactionError);
    setSuccess(storedUser.saveTransactionSuccess);
  }, [storedUser.saveTransactionSuccess, storedUser.saveTransactionError]);

  return (
    <>
      <div className="pb-12">
        <div className="page-container">
          <Header showBackButton={true} />
        </div>
        <div className="mt-[-48px]">
          <div className="px-5 mb-4">
            <p className="text-2xl font-bold">Cartões</p>
          </div>
        </div>
        <div className="px-3">
          <Dropdown title="cartões" options={dropDownItems} onChange={onCreditCardSelectedHandler} />
        </div>
        <div className="page-container flex flex-col gap-4 mt-5">
          {
            selected &&
            <div>
              <p className="text-xl font-bold">Adicionar transação</p>
              <span className="font-light">no cartão <span className="font-bold">{selected.title}</span></span>
            </div>
          }
          <TransactionForm onSubmit={onSubmitHandler} />
        </div>
      </div>
      <Alert show={success ?? error}>
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
            'Transação criada com sucesso!'
          }
          {
            error &&
            'Erro ao criar nova transação'
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

export default TransactionFormPage;
