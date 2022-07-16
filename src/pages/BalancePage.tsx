import { BottomSheetButton, Header, Input } from '../components';
import { Money } from 'phosphor-react';
import { useSelector } from 'react-redux';
import { selectUser, userApiActions } from '../store/slices/userSlice';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { useAppDispatch } from '../app/hook';
import { useState } from 'react';

const BalancePage = () => {
  const storedUser = useSelector(selectUser);
  const [salary, setSalary] = useState<any>(storedUser.profile?.salary);
  const dispatch = useAppDispatch();

  const onCloseBottomSheet = () => {
    const profile: any = { ...storedUser.profile };
    profile.salary = salary;
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
        buttonTitle="alterar salário"
        idKey="salario">
        <div className="w-full gap-5 mt-5 flex flex-col justify-between">
          <Input
            className="dark:bg-zinc-800"
            placeholder="salário"
            type="number"
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
      <BottomSheetButton
        title="oi"
        placeholder="oi"
        buttonTitle="oi"
        idKey="oi">
        <h1>oi</h1>
      </BottomSheetButton>
    </>
  );
};

export default BalancePage;
