import { Header } from '../components';
import { CaretRight, Wallet } from 'phosphor-react';

const BalancePage = () => {
  return (
    <>
      <div className="page-container">
        <Header showBackButton={true} />
        <div id="content" className="border-b-[0] border-zinc-900 pb-4">
          <div className="mb-4">
            <p>Salário</p>
            <p className="text-4xl font-bold">R$ 14.686,89</p>
          </div>
          <small>o salário é utilizado como valor base para calcular seu saldo disponível de cada mês.</small>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div
          className="flex flex-row gap-5 px-5 py-3 items-center justify-between border-t-[0.5px] border-zinc-900 hover:bg-zinc-900">
          <div className="flex flex-row gap-5 items-center justify-start">
            <Wallet size={28} />
            <button className="text-2xl">alterar salário</button>
          </div>
          <CaretRight size={14} />
        </div>
      </div>
    </>
  );
};

export default BalancePage;
