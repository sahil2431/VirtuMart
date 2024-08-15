import React from 'react'
import { Link } from 'react-router-dom'
import BackBtn from "../BackBtn"

const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Product Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">Sorry! The product you're looking for doesn't exist or has been removed.</p>
        <div className="flex flex-col items-center gap-4">
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Back to Home
        </Link>
        <BackBtn />
        </div>
      </div>
    </div>
  )
}

export default ProductNotFound
