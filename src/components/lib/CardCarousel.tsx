import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { useEffect, useState } from 'react';

export type CardCarouselItem = {
  id: number;
  title: string;
  description: string;
  color: string;
};

interface CardCarouselProps {
  items: CardCarouselItem[];
  onSelect?: (item: CardCarouselItem) => void;
}

const CardCarousel = ({ items, onSelect }: CardCarouselProps) => {
  const [_items, setItems] = useState(items);

  useEffect(() => setItems(items), [items]);

  return (
    <Flicking
      adaptive={true}
      autoResize={true}
      bounce={1}
      align="prev"
      circular={false}
      onChanged={item => onSelect && onSelect(_items[item.index])}>
      {_items.map(item => (
        <div
          key={item.id}
          className="flicking-panel w-[320px] h-[120px]">
          <div className={`p-4 ml-4 h-full ${item.color} rounded-lg border-[0.5px] border-zinc-800`}>
            <div className="flex flex-row items-center justify-between">
              <p className="text-md font-bold">{item.title}</p>
              <p className="text-lg font-black">7447</p>
            </div>
          </div>
        </div>
      ))}
    </Flicking>
  );
};

export default CardCarousel;
