import React from 'react';

import './App.css';
import useCarouselObserver from './hooks/useCarousel';

function App() {
  const IMAGES = [
    'https://images.unsplash.com/photo-1676677470461-e39d538cf7f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
    'https://images.unsplash.com/photo-1676553138763-6f83fac7094d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1676723939433-5e9e75560482?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80',
    'https://images.unsplash.com/photo-1676546121454-cf04e20b87db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  ];
  const [sliderIndex, setSliderIndex] = React.useState(0);

  const [sliderContainerRef, decrementSlideIndex, incrementSlideIndex] =
    useCarouselObserver({
      sliderIndex,
      setSliderIndex,
    });

  return (
    <div className="App">
      <div className="carousel-container" ref={sliderContainerRef}>
        {IMAGES.map((image, i) => (
          <img src={image} key={i} width="200px" height="100%"/>
        ))}
      </div>
      <div className="center">
        <button className="prev-btn" onClick={(): void => decrementSlideIndex(IMAGES.length - 1)}>
          Prev
        </button>
        <button className="next-btn" onClick={(): void => incrementSlideIndex(IMAGES.length - 1)}>
          Next
        </button>
      </div>
      <div className="">{sliderIndex}</div>
    </div>
  );
}

export default App;
