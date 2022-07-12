interface CardCarouselProps {
  afterChange?: (previous: any, current: any) => void;
  children: any;
}

const CardCarousel = ({ afterChange, children }: CardCarouselProps) => {
  return (
    <div>{children}</div>
  );
};

export default CardCarousel;
