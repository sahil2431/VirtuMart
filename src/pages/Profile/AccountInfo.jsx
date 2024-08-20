import React from "react";
import { useSelector } from "react-redux";
import NotLoggedIn from "../../components/Login&Signup/NotLoggedIn";
import BackBtn from "../../components/BackBtn"

const AccountInfo = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }
  return (
    <div className="min-h-[60vh] bg-gray-800 text-white justify-center flex flex-col items-center">
      <h2 className="text-center text-2xl font-extrabold">Account Details</h2>
      <div className="flex flex-col gap-5 m-10 lg:w-[40vw] md:w-[50vw] ">
        <div className="flex flex-col gap-2 text-xl ">
          <span className="">Name : </span>
          <span className="border-2 border-black rounded-xl p-2 pl-5 font-bold">{user.name}</span>
        </div>
        <div className="flex flex-col gap-2 text-xl">
          <span className="">UserId : </span>
          <span className="border-2 border-black rounded-xl p-2 pl-5 font-bold">{user.userId}</span>
        </div>
        <div className="flex flex-col gap-2 text-xl">
          <span className="">E-mail : </span>
          <span className="border-2 border-black rounded-xl p-2 px-5 text-sm md:text-lg font-bold">{user.email}</span>
        </div>
        <div className="flex flex-col gap-2 text-xl">
          <span className="">Mobile Number : </span>
          <span className="border-2 border-black rounded-xl p-2 pl-5 font-bold">{user.mobile}</span>
        </div>
        
      </div>
      <div className='text-center p-10'>
            <BackBtn/>
      </div>
    </div>
  );
};

export default AccountInfo;
