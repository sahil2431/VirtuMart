import React from 'react'
import { useNavigate } from "react-router-dom";
const HomeBtn = () => {
    const navigate = useNavigate();

    const handleHome = () => {
      navigate("/");
    };
  return (
    <button
      onClick={handleHome}
      className="px-4 font-bold py-2 w-36  bg-red-500 text-white rounded hover:bg-red-700"
    >
      Go to Home
    </button>
  )
}

export default HomeBtn
