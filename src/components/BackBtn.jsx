import React from "react";
import { useNavigate } from "react-router-dom";

function BackBtn() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleBack}
      className="px-4 font-bold py-2 w-28  bg-red-500 text-white rounded hover:bg-red-700"
    >
      Back
    </button>
  );
}

export default BackBtn;
