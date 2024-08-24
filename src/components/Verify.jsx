import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar1 from "./Navbar/Navbar1";
import { useDispatch, useSelector } from "react-redux";
import { resendLink, verifyEmailLink } from "../features/authSlice";
function Verify() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [email , setEmail] = useState("")
  const dispatch = useDispatch()

  const {user , error , emailVerified} = useSelector((state) => state.auth)

  const handleClick = () =>{
    dispatch(resendLink(email))
    setMessage("Link has been sent to your email")
  }
  useEffect(() =>{
    dispatch(verifyEmailLink(token))
    if(user && user.emailVerified){
      setIsVerified(true)
      setMessage("Email is verified")
    }
    else if(error){
      setIsVerified(false)
      setMessage( error || "Email is not verified")
    }
  } , [token])

 

  return (
    <>
      <Navbar1 />
      {emailVerified? (
        <div className="w-[100vw] h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-2xl text-green-500">Email is verified</h1>
          <h2 className="text-lg">Click Below Button to login</h2>
          <Link to="/login">
            <button className="w-40 h-10 bg-red-500 text-white cursor-pointer rounded-lg">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-[100vw] h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-2xl text-red-500">{message}</h1>
          <h3 className="text-lg  ">Email</h3>
          <input
        className="text-white w-1/2 rounded-md h-8 bg-slate-700"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
          <input
            onClick={handleClick}
            className="w-40 h-10 bg-red-500 text-white cursor-pointer rounded-lg"
            type="button"
            value="Resend Link"
          />
        </div>
      )}
    </>
  );
}

export default Verify;
