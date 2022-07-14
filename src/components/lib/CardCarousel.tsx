import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { useCallback, useEffect, useState } from 'react';

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

  const onChangedHandler = useCallback((item: any) => {
    const selected = _items[item.index];
    onSelect && onSelect(selected);
  }, [_items, onSelect]);

  useEffect(() => {
    setItems(items);
    onSelect && onSelect(items[0]);
  }, [items]);

  if (!_items.length) {
    return <></>;
  }

  return (
    <Flicking
      adaptive={true}
      autoResize={true}
      bounce={1}
      align="prev"
      circular={false}
      onChanged={onChangedHandler}>
      {_items.map(item => (
        <div
          key={item.id}
          className="flicking-panel w-[320px] h-[120px]">
          <div className={`p-4 ml-4 h-full ${item.color ?? 'bg-zinc-900'} rounded-lg border-[0.5px] border-zinc-800`}>
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
