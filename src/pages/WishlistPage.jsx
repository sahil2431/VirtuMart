import React, { useEffect , useState } from 'react'
import Card from '../components/Products/Card'
import { fetchWishlist, removeProduct } from '../features/api/wishlist'
import RemoveBtn from '../components/Cart/RemoveBtn'
import { Loading } from '../components'
import { toast } from 'react-toastify'

const WishlistPage = () => {

    const [wishlist, setWishlist] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [wishlistFetched , setWishlistFetched] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)

    useEffect(() => {
        const getWishlist = async () => {
            const data = await fetchWishlist()
            setWishlist(data);
            setTimeout(() => {
              setIsLoading(false);
            }, 5000);
            setWishlistFetched(true);
        };

        getWishlist();
        if(!wishlistFetched) {
          setWishlist([])
        }
    } , [wishlistFetched])

    const handleProductRemove = async (productId)=> {
      const data = await removeProduct(productId)
      if(data.statusCode) {
        toast.success(data.message)
        setWishlistFetched(false);
        setIsRemoved(true)
        setTimeout(()=>{
          setIsRemoved(false)
        }, 3000)

      }else {
        toast.error("Something went wrong")
      }
      
    }

    if(isLoading) {
      return <Loading />
    }
  return (
    <div className="bg-gray-800 min-h-[65vh]">
      <h1 className="text-white text-center font-bold text-2xl p-3">My Wishlist</h1>
      {isRemoved &&
      <div className=" bg-red-500 p-2 font-bold text-black w-screen text-center rounded-lg">
          Product Removed Successfully
        </div>}
      {wishlist.length == 0 && 
        <div className="text-red-500 text-center font-bold text-3xl p-3 flex items-center justify-center h-[58vh]">
        <h1>Your Wishlist is empty</h1>
      </div>
      }
      
      <div className="flex flex-col items-center">
        {wishlist.length > 0 &&
          wishlist.map((item) => (
            <div 
            className="flex justify-between items-center mb-4"
            key={item._id}
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
            <div >
            <RemoveBtn
            className='absolute lg:right-[20vw] xs:right-[10vw] right-[16vw]'
            removeId={item.product[0]._id}
            onRemove={handleProductRemove}
            />
            </div>
            </div>
          ))}
      </div>
      <div className="h-2"></div>
    </div>
  )
}

export default WishlistPage
