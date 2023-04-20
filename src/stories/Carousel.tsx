import React from 'react';
import { CarouselWrapper } from '../components';

interface SliderRefObject {
    prev: () => void;
    next: () => void;
    getPos: () => number;
  }

export const Carousel = () => {
    const [count, setCount] = React.useState(0)
    const swipeRef = React.useRef<SliderRefObject>(null);
    const IMAGES = [
        'https://images.unsplash.com/photo-1676677470461-e39d538cf7f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
        'https://images.unsplash.com/photo-1676553138763-6f83fac7094d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        'https://images.unsplash.com/photo-1676723939433-5e9e75560482?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80',
        'https://images.unsplash.com/photo-1676546121454-cf04e20b87db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      ];
    
      return (
        <div className="App">
        <CarouselWrapper ref={swipeRef}>
          {IMAGES.map((image, i) => (
            <img src={image} key={i} width="200px" height="100%"/>
          ))}
        </CarouselWrapper>
        <div className="center">
          <button className="prev-btn" onClick={(): void => swipeRef.current?.prev()}>
            Prev
          </button>
          <button className="next-btn" onClick={(): void => swipeRef.current?.next()}>
            Next
          </button>
        </div>
      </div>
      )
}