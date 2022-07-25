import './style.css';
import { useEffect, useRef, useState } from 'react';

export type CardCarouselItem = {
  id: string;
  title: string;
  description: string;
  color: string;
};

interface CardCarouselProps {
  items: CardCarouselItem[];
  onSelect?: (item: CardCarouselItem) => void;
}

const CardCarousel = ({ items, onSelect }: CardCarouselProps) => {
  const container = useRef<any>();
  const [__items, setItems] = useState<CardCarouselItem[]>([]);

  const threshold = 0.5;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(elem => {
      if (elem.isIntersecting) {
        onSelect && onSelect(items.filter(item => item.id === elem.target.id)[0]);
      }
    });
  }, { threshold });

  useEffect(() => {
    setItems(items);
  }, [items]);

  useEffect(() => {
    document.querySelectorAll('.card-carousel-v2-item').forEach(elem => observer.observe(elem));
  }, [__items]);

  return (
    <div ref={container} className="carousel-v2-container">
      {
        items.map((item) => (
          <div
            key={item.id}
            id={`${item.id}`}
            className="card-carousel-v2-item">{item.title}
          </div>
        ))
      }
    </div>
  );
};

export default CardCarousel;
