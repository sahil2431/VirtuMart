import React from 'react'
import { MdDelete } from "react-icons/md";
const RemoveBtn = ({
  className = "",
  removeId,
  onRemove
}) => {
  return (
    <button
    className={` ${className} font-bold rounded-lg`} 
    onClick={() => onRemove(removeId)}>
      <MdDelete color='red' size={"50px"} />
      </button>
  )
}

export default RemoveBtn

