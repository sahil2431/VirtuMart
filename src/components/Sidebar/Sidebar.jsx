import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cross from "../../assets/cross.svg";
import home from "../../assets/home.svg";
import contact from "../../assets/contact.svg";
import about from "../../assets/about.svg";
import profile from "../../assets/profile.svg";
import cart from "../../assets/cart.svg";
import wishlist from "../../assets/wishlist.svg";
import order from "../../assets/order.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { motion } from "framer-motion";

const Sidebar = ({
  onChange 
}) => {
  const [close, setClose] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch(logout(accessToken));
  };

  const navigate = useNavigate();

  const userItems = [
    {
      name: "My Profile",
      slug: `/profile/${user?.userId}/${user?._id}`,
      active: isLoggedIn,
      avatar: profile,
    },
    {
      name: "My Orders",
      slug: `/orders/${user?.userId}/${user?._id}`,
      active: isLoggedIn,
      avatar: order,
    },
    {
      name: "My Cart",
      slug: `/cart/${user?.userId}/${user?._id}`,
      active: isLoggedIn,
      avatar: cart,
    },
    {
      name: "Wishlists",
      slug: `/wishlists/${user?.userId}/${user?._id}`,
      active: isLoggedIn,
      avatar: wishlist,
    },
  ];

  const sideItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      avatar: home,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
      avatar: about,
    },
    {
      name: "Contact Us",
      slug: "/contact",
      active: true,
      avatar: contact,
    },
  ];

  const btnItmes = [
    {
      name: "Login",
      slug: "/login",
      active: !isLoggedIn,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !isLoggedIn,
    },
    {
      name: "Logout",
      slug: "/",
      active: isLoggedIn,
    },
    {
      name: "Delete Account",
      slug: "/deleteAccount",
      active: isLoggedIn,
    },
  ];



  return (
    <>
      <div 
      
      className={`w-screen h-screen absolute overflow-y-scroll bg-gray-800 bg-opacity-40 z-50 ${
            close ? "hidden" : ""
          }`}>

      
        <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
          className={` flex flex-col  w-64 h-screen bg-gray-800 z-40 bg-opacity-90 text-white`}
        >
          <div className="close absolute left-56 top-4">
            <img
              onClick={() => {
                setClose(!close);
                onChange()
              }}
              src={cross}
              alt=""
              className="cursor-pointer"
            />
          </div>
          <div
          onClick={() =>{
            setClose(!close)
            onChange()
          }}
          className="flex items-center justify-center h-20">
            <Logo 
            size="text-2xl" 
            color="text-white" 
            />
          </div>
          <div className="h-[1px] rounded-sm bg-white"></div>
          <ul className="itmes p-5 pt-10 flex flex-col gap-4">
            {userItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.active ? item.slug : "/loginerror"}
                  onClick={() => setClose(!close)}
                  className="flex gap-2"
                >
                  <img src={item?.avatar} alt="" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-[1px] rounded-sm bg-white"></div>

          <ul className="itmes p-5 pt-10 flex flex-col gap-4">
            {sideItems.map(
              (item, index) =>
                item.active && (
                  <li key={index}>
                    <Link
                      to={item.slug}
                      onClick={() => setClose(!close)}
                      className="flex gap-2"
                    >
                      <img src={item?.avatar} alt="" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
            )}
          </ul>

          <div className="h-[1px] rounded-sm bg-white"></div>

          <ul className="itmes p-5 pt-10 flex flex-col gap-4">
            {btnItmes.map(
              (item, index) =>
                item.active && (
                  <li key={index}>
                    <Link
                      to={item.slug}
                      onClick={() => {
                        if(item.name === "Logout"){
                          handleLogout();
                          
                        }
                        setClose(!close)

                      }}
                      className="flex gap-2"
                    >
                      <img src={item?.avatar} alt="" />
                      <span className="text-red-500">{item.name}</span>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </motion.div>
        </div>
    </>
  );
};

export default Sidebar;
