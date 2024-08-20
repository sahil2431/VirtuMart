import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrdersCard = ({ order }) => {
  const { user } = useSelector((state) => state.auth);
  const date = new Date(order.createdAt);

  
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="text-black">
      {order.productDetails.map((product) => (
        <Link
          key={product._id}
          to={`/orderDetails/${user.userId}/${order._id}/${product._id}`}
        >
          <div className="m-5 card flex flex-grow lg:gap-10 gap-4 items-center sticky bg-gray-300 rounded-md sm:h-[30vh] h-[20vh] sm:w-[70vw] w-[90vw] cursor-pointer">
            <img
              src={product.images[0]}
              className={`md:h-[29vh] md:w-72 sm:h-40 sm:w-48 h-24 w-28 object-cover p-3`}
              alt={product.name}
            />

            <div className="flex flex-col ml-3">
              <h3 className="text-lg">{product.name}</h3>
              <h3 className="text-sm">Rs {product.price}</h3>
              <h3 className="lg:text-lg text-sm font-semibold">
                Ordered :{formattedDate} {formattedTime}
              </h3>
              <h3 className="lg:text-lg text-sm">{product.status}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrdersCard;
