import Carousel from 'react-multi-carousel';

// TODO verificar como funciona e como fazer para selecionar o card atual corretamente
interface CardCarouselProps {
  afterChange?: (previous: any, current: any) => void;
  children: any;
}

const CardCarousel = ({ afterChange, children }: CardCarouselProps) => {
  return (
    <Carousel
      afterChange={afterChange}
      additionalTransfrom={0}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      partialVisible
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 3,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      customLeftArrow={<div />}
      customRightArrow={<div />}
      swipeable
    >
      {children}
    </Carousel>
  );
};

export default CardCarousel;
