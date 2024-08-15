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
          <div className="m-5 card flex flex-grow gap-10 items-center sticky bg-gray-300 rounded-md h-[30vh] w-[70vw] cursor-pointer">
            <img
              src={product.images[0]}
              className={`h-[29vh] w-72 object-cover p-3`}
              alt={product.name}
            />

            <div className="flex flex-col ml-3">
              <h3 className="text-xl">{product.name}</h3>
              <h3 className="text-lg">Rs {product.price}</h3>
              <h3 className="text-xl font-semibold">
                Ordered :{formattedDate} {formattedTime}
              </h3>
              <h3 className="text-xl">{product.status}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrdersCard;
