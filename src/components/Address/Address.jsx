import React, { useEffect, useState } from "react";
import { getAllAdress } from "../../features/api/address";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddressCard from "./AddressCard";
import BackBtn from "../BackBtn";

const Address = () => {
  const {user } = useSelector((state) => state.auth);
  const [addressFetched, setAddressFetched] = useState(false);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const fetchAddress = async () => {
      const data = await getAllAdress();
      setAddress(data);
      setAddressFetched(true);
    };

    if (!addressFetched) fetchAddress();
  }, [addressFetched]);

  
 
  return (
    <div className="min-h-[64vh] bg-gray-800 text-white">
      <h2 className="text-lg font-bold text-center py-5">Select Addresss from below or add a new address to proceed</h2>
      {address?.length > 0 && (
        <div className="flex flex-col gap-5 items-center py-3">
          {address.map((item) => (
          
            <AddressCard key={item._id}  address={item} onAddressChange={() => setAddressFetched(false)}/>
        
          ))}
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-7 py-5">
      <Link
        to={`/addAddress/${user?.userId}/${user?._id}`}
        className={` ${
          address?.length === 0 ? "h-[60vh] items-center" : ""
        }`}
      >
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
          Add New Address
        </button>
      </Link>

      <BackBtn/>
      </div>
    </div>
  );
};

export default Address;
