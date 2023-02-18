import React from 'react';

declare interface IProps {
    sliderIndex: number;
    setSliderIndex: (index: number) => void;
    reRender?: boolean;
    keyFocus?: boolean;
}

function useCarouselObserver({
  sliderIndex, setSliderIndex, reRender, keyFocus,
}: IProps): [
    React.MutableRefObject<any>,
    (imgLen: number) => void,
    (imgLen: number) => void,
    ] {
  const containerRef = React.useRef(null);

  const decrementSlideIndex = (imgLen: number): void => {
    if (sliderIndex - 1 < 0) {
      containerRef.current.scrollTo({
        left: containerRef.current.clientWidth * (imgLen),
        behavior: 'smooth',
      });
    } else {
      containerRef.current.scrollTo({
        left: containerRef.current.clientWidth * (sliderIndex - 1),
        behavior: 'smooth',
      });
    }
  };
  const incrementSlideIndex = (imgLen: number): void => {
    if (sliderIndex + 1 > imgLen) {
      containerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      containerRef.current.scrollTo({
        left: containerRef.current.clientWidth * (sliderIndex + 1),
        behavior: 'smooth',
      });
    }
  };

  const observerCallback: IntersectionObserverCallback = React.useCallback(([entry]): void => {
    if (entry.isIntersecting) {
      setSliderIndex(Math.round(
        (entry.target as HTMLElement).offsetLeft / entry.target.clientWidth,
      ));
    }
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.9,
    });
    if (containerRef.current) {
      for (const node of containerRef.current?.children) {
        observer.observe(node);
      }
      // Triggering focus for key navigation
      if (keyFocus) {
        containerRef.current.childNodes.item(sliderIndex).focus();
      }
    }

    return (): void => {
      observer.disconnect();
    };
  }, [reRender]);

  return [
    containerRef,
    decrementSlideIndex,
    incrementSlideIndex,
  ];
}

export default useCarouselObserver;
