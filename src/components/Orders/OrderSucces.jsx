import React from 'react'
import {motion} from "framer-motion"
import HomeBtn from '../HomeBtn'
const OrderSucces = () => {

  return (
    <div className="bg-gray-800 flex flex-col items-center justify-center min-h-[80vh] ">
      <motion.div
      className="w-36 h-36 bg-green-500 rounded-full flex items-center justify-center"
      initial = {{scale : 0}}
      animate = {{scale : 1}}
      transition={{duration : 1}}
      >
        <motion.svg
          className="w-20 h-20 text-white"
          viewBox="0 0 24 24"
          initial = {{pathLength : 0}}
          animate = {{pathLength : 1 }}
          transition={{duration : 1  , delay : 0.5}}
        >
            <motion.path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M7 13l3 3 7-7"
          />

        </motion.svg>

      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-white mt-4 mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Order Placed Successfully!
      </motion.h2>

      <motion.div
      initial = {{opacity : 0 , y : 20}}
      animate = {{opacity : 1 , y : 0}}
      transition={{duration : 1 , delay : 0.5}}
      >
      <HomeBtn/>
      </motion.div>
    </div>
  )
}

export default OrderSucces
