import React from 'react';
import { Link } from 'react-router-dom';
import BackBtn from "../BackBtn"
const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-700 mb-6">
          We're sorry, but the page you're looking for cannot be found. Please check the URL or go back to the homepage.
        </p>
        <div className="flex items-center flex-col gap-5">
          <Link to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Go to Homepage
          </Link>
          <BackBtn/>
        </div>
      </div>
      
    </div>
  );
};

export default ErrorPage;
