import React, { useState } from 'react'

const Filter = ({onClick}) => {

  return (
    <div>
      
      <button 
      onClick={onClick}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Filter
      </button>
    </div>
  )
}

export default Filter
