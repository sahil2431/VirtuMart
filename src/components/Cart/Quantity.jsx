import React, { useState } from 'react'
const Quantity = ({
    classname = "",
    initialQuantity = 1,
    maxQuantity = 10,
    cartId,
    onQuantityChange 
}) => {

    const [quantity , setQuantity] = useState(initialQuantity)

    const increment = async() =>{
      if(quantity < maxQuantity){
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        onQuantityChange(newQuantity , cartId);
      }
    }

    const decrement = () =>{
        if(quantity > 1){
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
            onQuantityChange(newQuantity , cartId);
        }
    }
  return (
    <>
      <div className={`flex items-center ${classname}`}>
        <button
        onClick={decrement}
        className="px-2 py-1 bg-gray-200 text-black rounded-l"
        > - 
        </button>
        <div className='px-2 py-1 w-6 h-8 text-center bg-white text-black'>{quantity}</div>
        <button 
        onClick={increment}
        className="px-2 py-1 bg-gray-200 text-black rounded-r"
      >
        +
      </button>
      </div>

    </>
  )
}

export default Quantity
