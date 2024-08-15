import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [token, setToken] = useState("")

  useEffect(() => {
    const pathSegments = window.location.href.split("/")
    setToken(pathSegments[pathSegments.length - 1])
  })
  const handleResetPassword = async() => {
    if(!newPassword ||!confirmPassword) {
      setError("Please enter new password and confirm password")
      return
    }
    if(newPassword === confirmPassword) {
      try {
        const res = await axiosInstance.post("/users/resetPassword", { newPassword , token});
        if (res.status === 200) {
          console.log("Success:", res.data);
          setSuccess(res.data.message)
        } else {
          console.log("Non-200 response:", res.data)
          setError(res.data.message)
        }
      } catch (error) {
        console.log("Error:", error.response.data);
        setError(error.response.data.message)
      }
    } else {
      setError("Passwords and Confirm newPassword do not match")
    }
  }

  return (
    <div className='text-white min-h-[50vh] bg-no-repeat bg-cover bg-fixed bg-[url("https://t3.ftcdn.net/jpg/01/17/33/22/360_F_117332203_ekwDZkViF6M3itApEFRIH4844XjJ7zEb.jpg")] w-scren'>
      <div className="flex flex-col justify-center gap-5 items-center h-[70vh]">
        {error && <div className="text-red-500 text-lg">{error}</div>}
        {success && <div className="text-green-500 text-lg">{success}</div>}
        <h1 className="font-bold text-4xl w-1/2 ">Reset Password</h1>

        <div className="w-1/2 flex flex-col gap-3">
          <h3 className="text-lg">Password</h3>
          <input
            className="text-white w-1/2 rounded-md h-8 bg-slate-700"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="newPassword"
            name=""
            id=""
          />
          <h3 className="text-lg">Confirm Password</h3>
          <input
          required = {true}
            className="text-white w-1/2 rounded-md h-8 bg-slate-700"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="confirmPassword"
            name=""
            id=""
          />

          <input 
          onClick={handleResetPassword}
          className="w-1/2 text-center bg-red-900 rounded-md h-8 p-1 cursor-pointer"
          type="button" 
          value="Reset Password" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
