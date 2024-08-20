import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const LogoutBtn = () => {
  
    const dispatch = useDispatch();
    const handleLogout = async () => {
        const accessToken = localStorage.getItem("accessToken");  
        dispatch(logout(accessToken));
        
      };
  return (
    <>
    <Link
      onClick={handleLogout}
      to="/"
      className="text-red-500 xs:block hidden hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
    >
      Log Out
    </Link>
    
    </>
  );
};

export default LogoutBtn;
