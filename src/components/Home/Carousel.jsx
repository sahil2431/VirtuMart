import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://res.cloudinary.com/dhif4a81l/image/upload/v1722683196/m4jhcmkmngehu6ncaoz2.jpg',
    'https://res.cloudinary.com/dhif4a81l/image/upload/v1722683440/uulpwo56ctnpumtzdd3y.webp',
    'https://res.cloudinary.com/dhif4a81l/image/upload/v1722683589/tndf1fx4ocwzjybgaaut.jpg',
    'https://res.cloudinary.com/dhif4a81l/image/upload/v1722683590/dbrurypmjd3lx8fh2rdx.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="p-10 relative w-full h-[45vh] rounded-md">
      <div className="carousel w-full h-full overflow-hidden relative flex flex-col justify-center items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : ''
            }`}
          >
            <img src={image} alt={`Image ${index + 1}`} className="w-[95vw] h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
