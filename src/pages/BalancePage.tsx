import { BottomSheetButton, Header } from '../components';
import { CaretRight, Wallet } from 'phosphor-react';
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
      <BottomSheetButton
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
