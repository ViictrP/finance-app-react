import { Alert, BottomSheetButton, Header, Input } from '../components';
import { CaretRight, Check, Money, Trash, X } from 'phosphor-react';
import { useSelector } from 'react-redux';
import { selectUser, userActions, userApiActions } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { useAppDispatch } from '../app/hook';
import React, { useCallback, useEffect, useState } from 'react';
import BalanceSkeletonPage from './BalanceSkeletonPage';

const BalancePage = () => {
  const storedUser = useSelector(selectUser);
  const [salary, setSalary] = useState<any>(storedUser.profile?.salary);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const dispatch = useAppDispatch();

  const onCloseBottomSheet = () => {
    const profile: any = { ...storedUser.profile };
    profile.salary = salary;
    dispatch(userApiActions.putUserProfileThunk(profile));
  };

  const onAlertDismiss = useCallback(() => {
    dispatch(userActions.resetDeleteError());
  }, [success, error]);

  const onConfirmation = () => {
    dispatch(userApiActions.deleteDataThunk());
    setShowConfirmationAlert(false);
  };

  const onCancelConfirmation = () => {
    setShowConfirmationAlert(false);
  };

  const onCleanDataClickHandler = () => {
    setShowConfirmationAlert(true);
  };

  useEffect(() => {
    setError(storedUser.deleteError);
    setSuccess(storedUser.deleteSuccess);
  }, [storedUser.deleteSuccess, storedUser.deleteError]);

  if (storedUser.isLoadingProfile) {
    return <BalanceSkeletonPage />;
  }

  return (
    <>
      <div className="page-container">
        <Header showBackButton={true} />
        <div id="content" className="border-b-[0] border-zinc-900 pb-4">
          <div className="mb-4">
            <p>Salário</p>
            <p className="text-4xl font-bold">{currencyFormatter(storedUser.profile?.salary ?? 0)}</p>
          </div>
          <small>o salário é utilizado como valor base para calcular seu saldo disponível de cada mês.</small>
        </div>
      </div>
      <BottomSheetButton
        title="alterar salário"
        placeholder="salário"
        buttonTitle="alterar salário"
        idKey="salario">
        <div className="w-full gap-5 mt-5 flex flex-col justify-between">
          <Input
            className="dark:bg-zinc-800"
            placeholder="salário"
            type="currency"
            icon={<Money size={24} weight="fill" />}
            onChange={value => setSalary(value)}
            requiredErrorMessage="Este campo é obrigatório"
          />
          <button type="button"
                  onClick={onCloseBottomSheet}
                  className="box-content bg-blue-500 p-2 rounded-md"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close">
            salvar
          </button>
        </div>
      </BottomSheetButton>
      <button
        className="flex flex-row items-center py-4 px-3 text-2xl justify-between w-full border-t-[0.5px] border-zinc-800"
        onClick={onCleanDataClickHandler}
        type="button">
        <div className="flex flex-row items-center gap-4">
          <Trash size={28} />
          limpar dados
        </div>
        <CaretRight size={14} />
      </button>

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
            'Dados apagados com sucesso!'
          }
          {
            error &&
            'Erro ao apagar dados'
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

      <Alert show={showConfirmationAlert}>
        <div className="my-2 m-auto">
          Está certo disso?
        </div>
        <p className="text-gray-600 dark:text-gray-100 text-xl font-bold py-2 px-6">
          Tem certeza que deseja apagar todos os cartões, faturas e transações?
        </p>
        <div className="flex items-center justify-between gap-4 w-full mt-8">
          <button type="button"
                  onClick={onCancelConfirmation}
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            Não
          </button>
          <button type="button"
                  onClick={onConfirmation}
                  className="py-2 px-4 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            Sim
          </button>
        </div>
      </Alert>
    </>
  );
};

export default BalancePage;
