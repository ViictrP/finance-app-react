import { Header } from '../components';
import { useState } from 'react';
import CardCarousel from '../components/lib/carousel_V2/CardCarousel_V2';

const CreditCardFormPage = () => {

  const [selected, setSelected] = useState('');

  const onCarouselItemChangeHandler = (itemId: string) => {
    setSelected(itemId);
  };

  return (
    <>
      <div className="page-container">
        <Header showBackButton={true} />
        <div className="flex flex-col gap-8">
          <p className="text-2xl font-bold">Adicionar cartão</p>
          <p>selecionado: <span className="text-blue-500 font-bold">{selected}</span></p>
        </div>
      </div>
      <CardCarousel
        items={['item 1', 'item 2', 'item 3', 'item 4', 'item 5']}
        onChange={onCarouselItemChangeHandler}
      />
    </>
  );
};

export default CreditCardFormPage;
