import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { useEffect, useState } from 'react';

export type CardCarouselItem = {
  id: number;
  title: string;
  description: string;
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
      align="prev"
      circular={false}
      onChanged={item => onSelect && onSelect(_items[item.index])}>
      {_items.map(item => (
        <div key={item.id} className="p-4 flicking-panel mr-2 w-[270px] h-[200px] bg-zinc-500 rounded-md">
          {item.title} - {item.description}
        </div>
      ))}
    </Flicking>
  );
};

export default CardCarousel;
