import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCart } from "../../features/api/cart";
import { useNavigate } from "react-router-dom";
import AddressCard from "../Address/AddressCard";
import BackBtn from "../BackBtn";
import { addOrder } from "../../features/api/order";
import { createOrder, verifyPayment } from "../../features/api/payment";
import {toast} from "react-toastify"
import { useSelector } from "react-redux";


const OrderPage = () => {
  const {user} = useSelector((state) => state.auth)
  const [cart, setcart] = useState([]);
  const [cartValue, setcartValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cartFetched, setCartFetched] = useState(false);
  const location = useLocation();
  const address = location.state?.address;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
      setcart(data.cart);
      setcartValue(data.cartValue);
      setCartFetched(true);
    };
    if (cart.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    fetchCart();
    if (!cartFetched) setcart([]);
  }, [cartFetched]);

  const handleOrder = async () => {
    setIsLoading(true);
    const orderCreate = await createOrder({
      amount: cartValue,
      currency: "INR",
    });
    if (!orderCreate.statusCode) {
      alert("Something went wrong");
      return;
    }
    setIsLoading(false);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_09YvszOhidVs4D",
      amount: cartValue * 100,
      currency: "INR",
      name: "VirtuMart",
      order_id: orderCreate.data.id,
      description: "Payment for your order",
      handler: async (response) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        console.log(response);
        const data = {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        };

        try {
          const res = await verifyPayment(data);
          if (res.statusCode) {
            toast.success("Payment Successful");
            const addressId = address._id;
            const paymentId = res.data._id;
            console.log(addressId, paymentId);
            const order = await addOrder({ addressId, paymentId });
            if (order) {
              navigate("success");
            }
          } else {
            toast.error("Payment Failed! Try after some time");
            navigate(`/cart/${user.userId}/${user._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <div className="min-h-[60vh] bg-gray-800 text-white">
      <h1 className="text-xl font-bold text-center pt-3">
        Address for Shipping
      </h1>
      <div className="p-4 flex justify-center">
        <AddressCard address={address} btn={false} />
      </div>
      {cart?.length > 0 && (
        <div>
          <h1 className="text-3xl font-bold text-center py-10">
            Order Summary
          </h1>
          <div className="flex flex-col items-center gap-1 pb-9">
            {cart?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between w-[55vw] border-2 border-white p-3"
              >
                <h1 className="text-xl">{item.product[0].name}</h1>
                <div className="flex flex-col w-28">
                  <div>
                    Rs {item.price} * {item.quantity}
                  </div>
                  <div>Rs {item.quantity * item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-center font-bold text-lg p-5 gap-5">
        <span className="">Order Value: </span>
        <span className="text-green-500">Rs {cartValue}</span>
      </div>
      <div className="flex justify-between p-5">
        <BackBtn />
        <button
          onClick={handleOrder}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          {isLoading ? "Processing...." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
