import { BottomSheetButton, Header, Input } from '../components';
import { Money } from 'phosphor-react';
import SkeletonLoading from '../components/SkeletonLoading';

const BalancePage = () => {

  return (
    <>
      <div className="page-container">
        <Header showBackButton={true} />
        <div id="content" className="border-b-[0] border-zinc-900 pb-4">
          <div className="mb-4">
            <p>Salário</p>
            <p className="text-4xl font-bold"><SkeletonLoading width={220} /></p>
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
            requiredErrorMessage="Este campo é obrigatório"
          />
          <button type="button"
                  className="box-content bg-blue-500 p-2 rounded-md"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close">
            salvar
          </button>
        </div>
      </BottomSheetButton>
    </>
  );
};

export default BalancePage;
