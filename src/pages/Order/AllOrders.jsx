import React , {useState , useEffect} from 'react'
import { getAllOrders } from '../../features/api/order'
import {
  OrdersCard,
  Loading
} from "../../components/index"
const AllOrders = () => {
    const [orders, setOrders] = useState([])
    const [ordersFetched , setOrdersFetched] = useState(false)
   
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await getAllOrders()
          if(response.statusCode) {
            setOrders(response.data.orders)
            setTimeout(() => {
              setOrdersFetched[true]            
            } , 2000)  
          }
        } catch (error) {
          console.log(error)
        }
        setTimeout(() => {
              setOrdersFetched(true)          
            } , 2000) 
      }

      fetchOrders()
    } ,[ordersFetched])

    const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if(!ordersFetched) return <Loading/>
  return (
    <div className='bg-gray-800 min-h-[64vh] '>
        <h1 className="text-white text-center font-bold text-2xl p-3">My Orders</h1>
        {orders.length == 0 && (
          <div className="text-red-500 text-center font-bold text-3xl p-3 flex items-center justify-center h-[58vh]">
            <h1>You did'nt made any order yet!</h1>
          </div>
        )}
      <div className="flex flex-col items-center">
        {sortedOrders.length > 0 && 
        <div 
        
        >
          {sortedOrders?.map((order) => (
            <div key={order._id}>
              <OrdersCard order={order} />
            </div>
          ))}
            

        </div>        
        }
      </div>
    </div>
  )
}

export default AllOrders
