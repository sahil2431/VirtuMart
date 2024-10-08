import React, { useEffect , useState } from 'react'
import { getOrderById } from '../../features/api/order';
import UserReviewfField from '../Products/UserReviewfField';
import Reviews from '../Products/Reviews';
import { useSelector } from 'react-redux';

const OrderDetail = () => {

  const [order , setOrder] = useState(null)
  const [address , setAddress] = useState(null)
  
  const {user} = useSelector((state) => state.auth)
  const [error , setError] = useState(null)
  const linkData = window.location.href.split("/");
  const orderId = linkData[linkData.length - 2]
  const productId = linkData[linkData.length - 1]

  const date = new Date(order?.createdAt);

  
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

  useEffect(() => {
    const fetchOrder = async() => {
      try {
        const data = await getOrderById(orderId , productId);
        if(data.statusCode) {
          setOrder(data.data)
          setAddress(data.data.address[0])
        }
        else {
          setError("Something went wrong")
          

        }
      } catch (err) {
        setError("Something went wrong")
        
      }
    }

    fetchOrder()
  } , [orderId , productId])
  return (
    <div className='bg-gray-800 min-h-[64vh] text-white'>
      {error && <h1 className='text-red-600 text-center'>{error}</h1>}
      {order && (
        <div>
          <h1 className=' text-center font-bold text-2xl p-3'>Order Details</h1>
          <div className='flex flex-col '>
            <div className='flex flex-col gap-2 border-2 bg-gray-900 border-gray-500 p-5 mx-16 my-5'>
              <h2 className='md:text-xl text-lg font-bold'>Delivery address</h2> 
              <h3 className='font-bold'>{address.name}</h3>
              <p>{address.address1} {address.address2} , {address.district} , {address.state} , {address.pincode}</p>
              <h3>Phone number : {address.phone}</h3>
            </div>

            <div className='flex md:flex-row flex-col gap-2 md:items-center justify-between border-2 bg-gray-900 border-gray-500 p-5 mx-16 my-5'>
              <div className='flex md:flex-row flex-col  gap-5'>

              <img 
              className='xs:h-48 h-32 w-60 object-cover rounded-md mx-auto'
              src={order.productDetails[0].images[0]} 
              alt="" />
              <div className='flex flex-col gap-1'>
              <h3>{order.productDetails[0].name}</h3>
              <p>{order.productDetails[0].discription}</p>
              <h3>Qunatity Order : {order.quantity}</h3>
              <h3 className='font-bold'>{order.status}</h3>
              <h3 className='md:text-lg text-sm'>Ordered : {formattedDate} , {formattedTime}</h3>
              <h3 className='font-bold sm:text-xl mt-5 text-sm'>Rs {order.productDetails[0].price} * {order.quantity} = Rs {order.productDetails[0].price * order.quantity}</h3>
             
              </div>
              </div>

              {order.status === "Pending" && (
                <input 
                type="button" 
                value="Cancel Order" 
                className='bg-red-500   text-white font-bold p-5 h-16 rounded-md cursor-pointer'/>
              )}
            </div>
            <div className='flex justify-center items-center p-5'>

            {order.reviews.length > 0 ? <Reviews reviews={order.reviews} text='Your Review' reviewdBy={user.name} userId={user.userId}/> : <UserReviewfField productId={order.productId}/>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetail
