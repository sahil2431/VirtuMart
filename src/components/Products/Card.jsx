import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { useSelector } from "react-redux";

const Card = ({
  product,
  imageWidth = "w-72",
  width = "w-72",
  className ,
  height = "h-96",
  imageHeight = "h-72",
  price = product.price,
  orderedDate = null
  
}) => {

  const {isLoading , user} = useSelector((state) => state.auth)
  let search = `id=${product._id}`
  if(user) { search += `&userId=${user._id}`}
  if(isLoading) {
    return <Loading/>
   } 

   
  return (
    <Link to = {`/productDetails?${search}`} state={{ product } }>
    <div className={`m-5 card ${className} bg-gray-300 text-black rounded-md ${height} ${width} cursor-pointer`}>
      <img
        src={product.images[0]}
        className={`${imageHeight} ${imageWidth} object-cover p-3`}
        alt={product.name}
      />
<div className="flex flex-col ml-3">
      <h3 className="text-xl">{product.name}</h3>
      <h3 className="text-lg">Rs {price}</h3>
      {orderedDate === null ? <h3 className="text-xl font-semibold">Free Deleivery</h3> : <div><h3 className="text-xl font-semibold">Ordered :{orderedDate}</h3>
      <h3 className="text-xl">{product.status}</h3>
      </div>}
      </div>
    </div>
    </Link>
  );
};

export default Card;
