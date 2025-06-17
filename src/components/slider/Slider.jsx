import React, { useState, useEffect } from 'react';
import '../../styles/Slider.css';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  
  const images = [
    "/assets/primaria.jpg",
    "/assets/primaria_1.jpg",
    "/assets/primaria_2.jpg"
  ];

  const plusSlides = (n) => {
    let newIndex = slideIndex + n;
    
    if (newIndex > images.length) {
      newIndex = 1;
    } else if (newIndex < 1) {
      newIndex = images.length;
    }
    
    setSlideIndex(newIndex);
  };

  // Auto slide functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      plusSlides(1);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [slideIndex]);

  return (
    <div className="slider">
      {images.map((img, index) => (
        <div 
          className="slide fade" 
          key={index}
          style={{ display: index + 1 === slideIndex ? 'block' : 'none' }}
        >
          <img src={img} className="slide__img" alt={`Slide ${index + 1}`} />
        </div>
      ))}
      
      <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
      <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
    </div>
  );
};

export default Slider;
