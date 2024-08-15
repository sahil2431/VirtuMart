
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
const NotLoggedIn = () => {
  const {isLoggedIn} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(isLoggedIn) {
      navigate(-1)
    }
  } ,[])
  return (
    
    <div className="min-h-[65vh] flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-bold">
        Login first to proceed further
      </h2>
      <p className="text-center">Click the button below to login</p>
      <div className="flex justify-center mt-4">
        <Link to="/login">
          <button className="w-40 h-10 bg-red-500 text-white rounded-lg">
            Login
          </button>
        </Link>
      </div>
    </div>
  
  );
};

export default NotLoggedIn;
