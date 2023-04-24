import React from 'react';
import './carousel.css';

type Props = {
  children: React.ReactNode;
};

const CarouselWrapper = React.forwardRef((props: Props, ref): JSX.Element => {
  const [sliderIndex, setSliderIndex] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(
    ref,
    () => {
      const imgLen = (containerRef.current?.childNodes.length || 1) - 1;
      return {
        next() {
          if (sliderIndex + 1 > imgLen) {
            containerRef.current?.scrollTo({
              left: 0,
              behavior: 'smooth',
            });
          } else {
            containerRef.current?.scrollTo({
              left: containerRef.current.clientWidth * (sliderIndex + 1),
              behavior: 'smooth',
            });
          }
        },
        prev() {
          if (sliderIndex - 1 < 0) {
            containerRef.current?.scrollTo({
              left: containerRef.current.clientWidth * imgLen,
              behavior: 'smooth',
            });
          } else {
            containerRef.current?.scrollTo({
              left: containerRef.current.clientWidth * (sliderIndex - 1),
              behavior: 'smooth',
            });
          }
        },
        getPos() {
          return sliderIndex;
        },
      };
    },
    [sliderIndex]
  );

  const observerCallback: IntersectionObserverCallback = React.useCallback(
    ([entry]): void => {
      if (entry?.isIntersecting) {
        setSliderIndex(
          Math.round(
            (entry.target as HTMLElement).offsetLeft / entry.target.clientWidth
          )
        );
      }
    },
    []
  );

  React.useEffect(
    () => {
      const observer = new IntersectionObserver(observerCallback, {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 1,
      });
      if (containerRef.current?.children) {
        for (const node of Array.from(containerRef.current.children)) {
          observer.observe(node);
        }
        // Triggering focus for key navigation
        //   if (keyFocus) {
        //     containerRef.current.childNodes.item(sliderIndex).focus();
        //   }
      }

      return (): void => {
        observer.disconnect();
      };
    },
    [
      // reRender
    ]
  );

  return (
    <div className="carousel-container" ref={containerRef}>
      {props.children}
    </div>
  );
});

export default CarouselWrapper;
