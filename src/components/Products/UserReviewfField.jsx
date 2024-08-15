import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { addReview } from "../../features/api/review";
import { toast } from "react-toastify";
const UserReviewfField = ({productId , onReview}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [response, setResponse] = useState("");
  const [reviewStatus , setReviewStatus] = useState(false)
  const [message , setMessage] = useState("")
  const starColor = (rate) => {
    if (rate <= rating) {
      if (rate <= 2) {
        return "#ff1807";
      } else if (rate == 3) {
        return "#ffc107";
      } else return "#069631";
    } else return "text-gray-400";
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if(rating === 0 || review === "") {
      setResponse("Please fill all the fields")
      return;
    };

    const data = await addReview({rating , review , productId})
    console.log(data)
    setReviewStatus(data.statusCode)
    toast.success(data.message)
    setMessage(data.message)
    setTimeout(() => {
      onReview()
      setMessage("")
    }, 3000);
  }


  return (
    <div className="flex flex-col items-center md:w-[20vw] w-[70vw]">
            {message && <h3 className={`${reviewStatus ? "text-green-600" : "text-red-600"} text-center text-sm font-bold`}>{message}</h3>}

      <h3 className="text-md font-semibold mb-2">Rate this product</h3>
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className="hidden"
              />
              <FaStar
                className={`cursor-pointer`}
                color={ratingValue <= rating ? starColor(rating) : "#e4e5e9"}
                size={20}
              />
            </label>
          );
        })}
      </div>
      <p className="mt-2">Your rating: {rating}</p>
      <textarea
        className="bg-black w-full m-5 p-2 border rounded"
        rows="4"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        className="bg-red-500 text-white px-5 mb-4 py-2 rounded-lg mt-5"
        onClick={handleReview}
      >
        Submit Review
      </button>
      {response && <p className="text-red-500">{response}</p>}
    </div>
  );
};

export default UserReviewfField;
