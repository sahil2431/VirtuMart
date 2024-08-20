import React, { useState } from "react";
import BackBtn from "../../components/BackBtn";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import NotLoggedIn from "../../components/Login&Signup/NotLoggedIn";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting , setIsSubmitting] = useState(false);
  const {isLoggedIn} = useSelector((state) => state.auth)

  const handlePasswordUpdate = async () => {
    if(oldPassword === "" || newPassword === ""){
      toast.error("Please fill all the fields")
      return;
    }
    if(oldPassword === newPassword){
      toast.error("Old password and new password cannot be same")
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.patch("/users/updatePassword", {
        oldPassword,
        newPassword,
      });
    if(response.data.statusCode) {
      toast.success(response.data.message)
    }
    } catch (error) {
      toast.error("Error in changing password")
    }finally {
      setIsSubmitting(false);
    }
  }

  

  return (
    <div className="min-h-[62.4vh] bg-gray-800 text-white">
      {isLoggedIn ? (<><h2 className="text-center pt-4 text-3xl font-extrabold">
        Update Password
      </h2>

      <div className="min-h-[40vh] flex flex-col gap-3 justify-center items-center">
        <div className="flex flex-col md:w-1/4 w-1/2">
        <label className="text-sm p-3">Old Password</label>
        <input
          value={oldPassword}
          className="text-white rounded-md h-8 bg-slate-700 p-2"
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          type="password"
          name=""
          id="oldPassword"
        />
        </div>

        <div className="flex flex-col md:w-1/4 w-1/2">

        <label className="text-sm p-3">New Password</label>
        <input
          value={newPassword}
          className="text-white rounded-md h-8 bg-slate-700 p-2"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          type="password"
          name=""
          id="newPassword"
        />
        </div>

        <input
          onClick={handlePasswordUpdate}
          className={`text-center ${isSubmitting ? "bg-red-300" : "bg-red-600"} mt-5 rounded-md p-3 cursor-pointer`}
          type="button"
          value={isSubmitting ? "Please Wait" : 'Update pasword'}
          disabled = {isSubmitting}
        />

        
      </div></>) : <NotLoggedIn/>}
      <div className="text-center p-10">
          <BackBtn />
        </div>
    </div>
  );
};

export default UpdatePassword;
