import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import React ,{useState} from 'react'
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { addItemToCart } from '../../features/api/cart';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct, removeProduct } from '../../features/api/wishlist';

import {
  NextArrow,
  PreviousArrow,
  Loading,
  Quantity
} from "../index"

const ProductDetail = ({product , onProductChange}) => {

    const [isError , setIsError]  = useState(false)
    const [isWishlisted , setIsWishlisted] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const {isLoggedIn , user} = useSelector((state) => state.auth)
    const {isLoading} = useSelector((state) => state.product)
    const [message, setMessage] = useState("")
    const [isAddedToCart , setIsAddedToCart] = useState(false)
    const navigate = useNavigate()

    const handleQuantityChange = async (quantity) => {
        setQuantity(quantity)
    }

    const handleWishlist = async() => {
      if(!isLoggedIn) {
        navigate("/loginError")
        return
      }
      if(product.isWishlisted) {
        const data = await removeProduct(product._id)
        if(data.statusCode) {
          setMessage("Product removed from wishlist")
          setIsWishlisted(true)
          setTimeout(()=>{
            setIsWishlisted(false)
            setMessage("")
            onProductChange()
          }, 2000)
        }
        
        else {
          setMessage("Error removing from wishlist")
          setIsError(true)
          setTimeout(()=>{
            setIsError(false)
            setMessage("")
          }, 2000)
        }
      }
      else {
        const data = await addProduct(product._id)
        if(data.statusCode) {
          setMessage("Product wishlisted")
          setIsWishlisted(true)
          setTimeout(()=>{
            setIsWishlisted(false)
            setMessage("")
            onProductChange()
          }, 2000)
          
        }
        else {
          setMessage("Error while Wishlisting")
          setIsError(true)
          setTimeout(()=>{
            setIsError(false)
            setMessage("")
          }, 2000)
        }
      }
    }
    const handleCart = async () => {
      if(product.isAddedToCart) {
        navigate(`/cart/${user.userId}/${user._id}`)
        return
      }
   
        if(isLoggedIn){
          const data = await addItemToCart(product._id , quantity)
          setQuantity(1)
          setIsAddedToCart(true)
          setMessage("Product Added to Cart")
          setTimeout(()=>{
            setIsAddedToCart(false)
            setMessage("")
            onProductChange()
          }, 2000)
        }
        else{
          navigate("/loginError")
        }   
      }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow className={"md:block hidden"} />,
        prevArrow: <PreviousArrow className={"md:block hidden"}/>,
      };
      if(isLoading) {
        return <Loading/>
      }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    <div>
    <Slider {...settings} className=''>
      {product.images?.map((image , index) => (
        <div key={index} className="flex items-center justify-center object-contain">
          <img
          src={image}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-md"
          />
          </div>
      ))}
      </Slider>

    </div>
    <div>
      {isError && <h3 className='text-green-600 text-xl font-bold'>{message}</h3>}
      {isWishlisted || isAddedToCart ? <h3 className='text-green-600 text-xl font-bold'>{message}</h3> : ""}
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className=" mb-6 text-lg">{product?.description}</p>
      <div className="flex flex-col mb-6 gap-5">
        <span className="text-2xl font-bold ">Rs {product.price}</span>

        <Quantity
        onQuantityChange={handleQuantityChange}
        />
        <button 
        disabled={product.quantityAvailable === 0 || isAddedToCart}
        onClick={handleCart}
        className={`${isAddedToCart ? "cursor-not-allowed bg-blue-400" : " bg-blue-500  hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}>
          {product.isAddedToCart ? "Go to Cart" : "Add to Cart"}
        </button>
       <Link 
       to={isLoggedIn ? `/address/${user?.userId}/${user?._id}` : "/loginError"}
       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
         onClick={handleCart}
       >
        <button 
        disabled={product.quantityAvailable === 0 || isAddedToCart}
        >
          Buy Now
        </button>
        </Link>

        <button 
        onClick={handleWishlist}
        className={` ${!product.isWishlisted ? "bg-pink-600" : "bg-red-500"} ${product.isWishlisted ? "hover:bg-red-700" : "hover:bg-pink-700"} text-white font-bold py-2 px-4 rounded`}
        >{product.isWishlisted ? "Remove from wishlist" : "Add to Wishlist"}
        </button>
      </div>

      <div>
        {product.quantityAvailable === 0 && <h3 className='text-red-600'>Out of Stouck</h3>}
        {product.quantityAvailable !== 0 && product.quantityAvailable < 5 ? <h3 className='text-red-600'>Only few left</h3> : <h3 className='text-green-600'>In Stock</h3>}
        

      </div>
      <h1 className={`${product.rating?.averageRating.$numberDecimal > 3 ? "text-green-500" : "text-red-600"}  `}>Rating : {product.rating?.averageRating.$numberDecimal || "0"}</h1>
      
      
    </div>

    
  </div>
  )
}

export default ProductDetail
