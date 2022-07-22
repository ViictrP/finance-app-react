import { Header } from '../components';

const CreditCardFormPage = () => {

  return (
    <div className="page-container">
      <Header showBackButton={true}/>
      <div className="flex flex-col gap-8">
        <p className="text-2xl font-bold">Adicionar cartão</p>
      </div>
    </div>
  );
};

export default CreditCardFormPage;
