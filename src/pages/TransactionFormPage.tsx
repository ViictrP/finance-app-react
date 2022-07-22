import { useSelector } from 'react-redux';
import { selectUser, userApiActions } from '../store/slices/userSlice';
import { useCallback, useEffect, useState } from 'react';
import { Dropdown, Header, TransactionForm } from '../components';
import { CreditCard, Transaction } from '../entities';
import { useAppDispatch } from '../app/hook';
import { DropdownOption } from '../components/lib/Dropdown';

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
        creditCard: { id: creditCard.id },
      } as any;
    }
    dispatch(userApiActions.postTransactionThunk(transaction));
  }, [storedUser.profile, selected]);

  useEffect(() => {
    if (storedUser.profile && !storedUser.isLoadingProfile) {
      const _dropdownItems: any = storedUser.profile?.creditCards.map(creditCard => ({
        value: creditCard.id,
        title: creditCard.title,
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
      {error && <p>error</p>}
      {success && <p>success</p>}
      <div className="pb-12">
        <div className="page-container">
          <Header showBackButton={true}/>
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
    </>
  );
};

export default TransactionFormPage;
