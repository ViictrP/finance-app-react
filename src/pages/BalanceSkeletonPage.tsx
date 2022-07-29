import { Header } from '../components';
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
    </>
  );
};

export default BalancePage;
