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
    <div className="min-h-[60vh] bg-gray-800 text-white">
      <h2 className="text-center text-2xl font-extrabold">Account Details</h2>
      <div className="flex flex-col gap-5 m-10">
        <div className="flex gap-2 justify-between text-xl font-semibold">
          <span className="">Name </span>
          <span className="w-[250px]">{user.name}</span>
        </div>
        <div className="flex gap-2 justify-between text-xl font-semibold">
          <span className="">UserId </span>
          <span className="w-[250px]">{user.userId}</span>
        </div>
        <div className="flex gap-2 justify-between text-xl font-semibold">
          <span className="">E-mail </span>
          <span className="w-[249px]">{user.email}</span>
        </div>
        <div className="flex gap-2 justify-between text-xl font-semibold">
          <span className="">Mobile Number </span>
          <span className="w-[250px]">{user.mobile}</span>
        </div>
        
      </div>
      <div className='text-center p-10'>
            <BackBtn/>
      </div>
    </div>
  );
};

export default AccountInfo;
