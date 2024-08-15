import React, { useState } from "react";
import BackBtn from "../BackBtn";
import axiosInstance from "../../utils/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, seterror] = useState("")
  const [success, setsuccess] = useState("")

  const handleEmailSend = async () => {
    try {
      console.log(email)

      const res = await axiosInstance.post("/users/forgotPassword", { email });
      console.log(email)
      if (res.status === 200) {
        console.log("Success:", res.data);
        setsuccess(res.data.message)
      } else {
        console.log("Non-200 response:", res.data)
        seterror("Email not found")

      }
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response.data);
        seterror(error.response.data.message)
      } else {
        console.log("Error:", error.message);
        seterror(error.message)
      }
    }
  }
  return (
    <div className='text-white min-h-[50vh] bg-no-repeat bg-cover bg-fixed bg-[url("https://t3.ftcdn.net/jpg/01/17/33/22/360_F_117332203_ekwDZkViF6M3itApEFRIH4844XjJ7zEb.jpg")] w-scren'>
      <div className="flex flex-col justify-center gap-5 items-center h-[70vh]">
        {error && <div className="text-red-500 text-lg">{error}</div>}
        {success && <div className="text-green-500 text-lg">{success}</div>}
      <h1 className="font-bold text-4xl w-1/2 ">Forgot password</h1>
        <p className="w-1/2">Enter email to send password reset link</p>
        <div className="w-1/2 flex flex-col gap-3">
          <input 
          value={email}
          className="text-white w-1/2 rounded-md h-8 bg-slate-700"
          onChange={(e) => setEmail(e.target.value)}
          type="email" 
          name="" 
          id="" />

          <input 
          onClick={handleEmailSend}
          className="w-1/2 text-center bg-red-900 rounded-md h-8 p-1 cursor-pointer"
          type="button" 
          value="Send Link" />

          <div className="w-1/2 mt-10 text-center">
          <BackBtn/>

          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ForgotPassword;
