import { Header } from '../components';
import { CaretRight, Wallet } from 'phosphor-react';
import BottomSheet from '../components/BottomSheet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, userApiActions } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { useAppDispatch } from '../app/hook';

const BalancePage = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const storedUser = useSelector(selectUser);
  const dispatch = useAppDispatch();

  // @ts-ignore
  const displayBottomSheet = () => setShowBottomSheet(oldState => ({ ...oldState }));

  const onCloseBottomSheet = (value: any) => {
    setShowBottomSheet(false);
    const profile: any = { ...storedUser.profile };
    profile.salary = value;
    dispatch(userApiActions.putUserProfileThunk(profile));
  };

  return (
    <>
      <div className="page-container">
        <Header showBackButton={true} />
        <div id="content" className="border-b-[0] border-zinc-900 pb-4">
          <div className="mb-4">
            <p>Salário</p>
            <p className="text-4xl font-bold">{
              storedUser.isLoadingProfile ? 'loading...' :
              currencyFormatter(storedUser.profile?.salary ?? 0)
            }</p>
          </div>
          <small>o salário é utilizado como valor base para calcular seu saldo disponível de cada mês.</small>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div
          className="flex flex-row gap-5 px-5 py-3 items-center justify-between border-t-[0.5px] border-zinc-900 hover:bg-zinc-900">
          <div className="flex flex-row gap-5 items-center justify-start">
            <Wallet size={28} />
            <button className="text-2xl" onClick={displayBottomSheet}>alterar salário</button>
          </div>
          <CaretRight size={14} />
        </div>
      </div>
      <BottomSheet
        title="alterar salário"
        placeholder="salário"
        buttonTitle="salvar"
        show={showBottomSheet}
        onClose={onCloseBottomSheet}
      />
    </>
  );
};

export default BalancePage;
