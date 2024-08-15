import React from "react";
import { Link } from "react-router-dom";
const Logo = ({
    color = "text-blue-500",
    size = "text-2xl",
}) => {
  return (
    <>
    <Link to="/" className={`flex items-center font-bold  ${color} ${size}`}>
    VirtuMart
    </Link>
    </>
  );
};

export default Logo;
