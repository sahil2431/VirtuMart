import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
const Reviews = ({
  reviews,
  text = "Reviews" ,
  reviewdBy ,
  userId
}) => {
  const {isLoading} = useSelector((state) =>state.product)
    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0
        const starColor = ()=>{
          if(rating <= 2) {
            return "text-red-500"
          }else if(rating == 3) {
            return "text-yellow-500"
          }else return "text-green-500"
        }

        for (let i = 1; i <= 5; i++) {
          if (i <= fullStars) {
            stars.push(<FaStar key={i} className={starColor()} />)
          } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(<FaStarHalfAlt key={i} className={starColor()} />)
          } else {
            stars.push(<FaRegStar key={i} className={starColor()} />)
          }
        }
        return stars
      }
      
  return (
    <div className="max-h-[40vh] overflow-y-scroll bg-black text-white p-4 rounded-lg shadow-md mx-5 mb-1 mt-5 flex flex-col gap-3 md:w-[40vw] w-[70vw]" >
      <h3 className="text-md font-semibold mb-2 text-center">{text}</h3>
      {reviews?.map((review) => (
        <div key={review._id} className=''>

          <h3 className="text-lg font-semibold">{reviewdBy ? reviewdBy : review.reviewdBy[0]?.name}</h3>
          <h4 className="text-sm text-gray-400">{userId ? userId : review.reviewdBy[0].userId}</h4>
          <div className="flex items-center my-2">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm text-gray-400">({review.rating})</span>
          </div>
          <p className="text-gray-500">{review.review}</p>
          <div className='bg-white h-[2px] mt-2'></div>
        </div>

      ))}
    </div>
  )
}

export default Reviews
