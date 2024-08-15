import React from 'react'

const RemoveBtn = ({
  className = "",
  removeId,
  onRemove
}) => {
  return (
    <button
    className={`bg-red-500 ${className} w-24 p-2 font-bold rounded-lg`} 
    onClick={() => onRemove(removeId)}>
      Remove
      </button>
  )
}

export default RemoveBtn

