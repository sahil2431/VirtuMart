import React from "react";
import { Link } from "react-router-dom";


const CategoryButton = ({text , categoryId}) => {


  return (
    <Link to={`/products?categoryId=${categoryId}`}>
    <button 
    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
      <span className="relative md:px-5 px-3 md:py-2.5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {text}
      </span>
    </button>
    </Link>
  );
};

export default CategoryButton;
