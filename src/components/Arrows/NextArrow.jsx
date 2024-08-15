import React from 'react';

const PreviousArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    >
      
    </div>
  );
};

export default PreviousArrow;
