import React, { useEffect } from 'react'
import { useSelector , useDispatch } from'react-redux'  
import { Link } from 'react-router-dom';
import { logout } from '../../features/authSlice';
import NotLoggedIn from '../Login&Signup/NotLoggedIn';
import BackBtn from "../BackBtn"
const UserDashboard = () => {

  const {isLoggedIn , user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");  
    dispatch(logout(accessToken));
    
  };

  return (
    <div className=" bg-gray-800 text-white">
      <div className="p-4">
        
        {!isLoggedIn && (<NotLoggedIn/>)}
        {isLoggedIn && (
          <div>
            <h2 className="text-center text-2xl font-bold">
              Welcome {user.name}
            </h2>

            <ul className="min-h-[55.7vh] w-[15vw] mt-16 ml-28 space-y-2 flex flex-col gap-5">
            <Link
                to={`/accountInformation/${user.userId}/${user._id}`}
                label="User details"
              >
                {" "}
                <li>Profile Deatails</li>
              </Link>
              <Link
                to={`/updateAccountDetails/${user.userId}/${user._id}`}
                label="Update Account Details"
              >
                {" "}
                <li>Edit Profile Details</li>
              </Link>
              <Link
                to={`/updatePassword/${user.userId}/${user._id}`}
                label="Update Password"
              >
                {" "}
                <li>Update Password</li>
              </Link>
              <Link
                to={`/cart/${user.userId}/${user._id}`}
                label="Cart"
              >
                {" "}
                <li>Cart</li>
              </Link>
              <Link
                to={`/orders/${user.userId}/${user._id}`}
                label="Orders"
              >
                {" "}
                <li>Orders</li>
              </Link>
              <div className="logout flex flex-col gap-5">

              <Link
                onClick={handleLogout}
                to="/"
                className="w-40 text-red-500 focus:ring-4 focus:ring-gray-300 font-medium text-lg  mr-2 focus:outline-none"
              >
                Log Out
              </Link>

              <Link
                to={`/deleteAccount/${user.userId}`}
                className=" w-40 text-red-600 focus:ring-4 focus:ring-gray-300 font-medium text-lg  mr-2 focus:outline-none"
              >
                Delete Account
              </Link>
              </div>
            </ul>

            <div className='text-center p-10'>
            <BackBtn/>
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard
