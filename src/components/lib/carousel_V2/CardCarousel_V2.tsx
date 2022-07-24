import './style.css';
import { useEffect, useRef, useState } from 'react';

interface CardCarouselItem {
  id: string | number;
  value: string;
}

interface CardCarouselProps {
  items: string[];
  onChange?: (item: string) => void;
}

const CardCarousel = ({ items, onChange }: CardCarouselProps) => {
  const container = useRef<any>();
  const [__items] = useState(items);

  const threshold = 0.5;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(elem => {
      if (elem.isIntersecting) {
        onChange && onChange(elem.target.id);
      }
    });
  }, { threshold });

  useEffect(() => {
    document.querySelectorAll('.card-carousel-v2-item').forEach(elem => observer.observe(elem));
  }, [__items]);

  return (
    <div ref={container} className="carousel-v2-container">
      {
        items.map((item, index) => (
          <div
            key={index}
            id={`card-carousel-item-${index}`}
            className="card-carousel-v2-item">{item}
          </div>
        ))
      }
    </div>
  );
};

export default CardCarousel;
