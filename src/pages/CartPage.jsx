import React, { useEffect, useState } from "react";
import { getCart , removeItem , updateQuantity} from "../features/api/cart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  Loading,
  Quantity,
  RemoveBtn,
  BackBtn
} from "../components/index"


const CartPage = () => {
  const [cart, setcart] = useState([]);
  const [cartValue, setcartValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cartFetched, setCartFetched] = useState(false);
  const [removalMessage, setRemovalMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const {user} = useSelector((state) => state.auth)
  useEffect(() => {
      const fetchCart = async () => {
        setIsLoading(true)
        const data = await getCart();
        setcart(data.cart);
        setcartValue(data.cartValue);
        setCartFetched(true);
      };
      
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      
      fetchCart();
      if(!cartFetched) setcart([])
  }, [cartFetched]);

  const handleQuantityChange = async (quantity , cartId) => {
    const data = await updateQuantity(cartId, quantity);
    setCartFetched(false);
  };

  const handleProductRemove = async (productId) => {
    const data = await removeItem(productId);
    setCartFetched(false);
    setRemovalMessage(data.message);
    setShowMessage(true);
    setTimeout(()=>{
      setShowMessage(false);
    }, 3000)

  }

  const sortedCart = cart.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-800 min-h-[64vh] ">
      <h1 className="text-white text-center font-bold text-2xl p-3">My cart</h1>
      {showMessage && (
        <div className=" absolute bg-red-500 p-2 font-bold text-black w-screen text-center rounded-lg">
          Product Removed Successfully
        </div>
      )}
      {!isLoading && cart.length === 0 ? (
        <div className="text-red-500 text-center font-bold text-3xl p-3 flex items-center justify-center h-[58vh]">
          <h1>Your cart is empty</h1>
        </div>
      ) : ""}
      <div className="h-14">
      
      </div>
      <div className="flex flex-col items-center">
        {sortedCart.length > 0 &&
          sortedCart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4"
            >
              <Card
                className={"xs:flex flex-grow lg:gap-10 sm:gap-3 gap-1 items-center sticky "}
                width="lg:w-[70vw] w-[70vw] xs:w-[90vw]"
                product={item.product[0]}
                height="md:h-[30vh] xs:h-[20vh] h-[32vh]"
                imageHeight="md:h-[29vh] h-[18vh]"
                imageWidth="md:w-[29vh] w-[18vh]"
                price={item.price}
                isQuantity={true}
                quantity={item.quantity}
              />
              <div className="absolute lg:right-[20vw] xs:right-[10vw] right-[16vw] flex flex-col gap-5 justify-center items-center">
                <Quantity
                
                  initialQuantity={item.quantity}
                  cartId={item._id}
                  onQuantityChange={handleQuantityChange}
                />
                <RemoveBtn
                  removeId={item._id}
                  onRemove={handleProductRemove}
                />
              </div>
            </div>
          ))}
      </div>
      {cart.length>0 && <div><div className="h-[1px] rounded-sm bg-white"></div>
      <div className=" p-5 font-bold bg-red-500 cartPrice text-white flex justify-around text-xl">
        <h2>Total Value</h2>
        <h2>Rs {cartValue}</h2>
      </div> 

      <div className='flex justify-between p-5'>
      <BackBtn/>
      <Link
      to={`/address/${user?.userId}/${user?._id}`}
      >
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">Continue</button>
      </Link>
      </div>
      </div>
      }
      
    </div>
  );
};

export default CartPage;
