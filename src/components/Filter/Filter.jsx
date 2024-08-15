import React , {useEffect, useState} from "react";
import { motion } from "framer-motion";

const Filter = ({ array = [], onClick , clearSelection }) => {
  const [selected, setSelected] = useState(null);
  const handleOption = (e) => {
    if(selected === e.target.textContent) {
      setSelected(null)
      onClick(null)
      return
    }
    onClick(e.target.textContent);
    setSelected(e.target.textContent);
  }

  useEffect(() => {
    if(clearSelection) {
      setSelected(null)
    }
  } , [clearSelection])
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2 p-4 rounded-lg bg-gray-700"
    >
      {array.length > 0 &&
        array.map((value) => (
          <div
            onClick={handleOption}
            key={value._id}
            className={`${selected === value.name ? "bg-gray-500" : "bg-black"} p-2 rounded-2xl cursor-pointer`}
          >
            <h1 className="text-sm">{value.name}</h1>
          </div>
        ))}
    </motion.div>
  );
};

export default Filter;
