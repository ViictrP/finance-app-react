import 'react-multi-carousel/lib/styles.css';
import { Header, Input } from '../components';
import { MagnifyingGlass } from 'phosphor-react';
import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import CardCarousel from '../components/lib/CardCarousel';

const CreditCardPage = () => {
  const searchInputRef = useRef(null);

  return (
    <div className="page-container">
      <Header />
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold">Filtrar seus cartões</p>
        <Input
          ref={searchInputRef}
          placeholder="buscar cartões..."
          icon={<MagnifyingGlass size={24} />}
        />
        <p className="text-xl">Cartões</p>
        <CardCarousel afterChange={(prev, curr) => alert(curr.currentSlide)}>
          <div className="w-[270px] h-[200px] bg-blue-500 rounded-md"></div>
          <div className="w-[270px] h-[200px] bg-orange-400 rounded-md"></div>
          <div className="w-[270px] h-[200px] bg-fuchsia-500 rounded-md"></div>
        </CardCarousel>
      </div>
    </div>
  );
};

export default CreditCardPage;
