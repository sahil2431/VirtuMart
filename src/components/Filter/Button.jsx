import React from "react";

const Button = ({ text ,onclick , className }) => {
  const handleButton = () => {
    onclick()
  }
  return (
    <button
    onClick={handleButton}
      type="button"
      className={`border-2 p-2 rounded-lg hover: hover:text-white transition duration-300 ease-in-out ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
