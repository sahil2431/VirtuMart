import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { addAddress } from "../../features/api/address";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const [addressAdded, setAddressAdded] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const response = await addAddress(data);
    if (response?.statusCode) {
      setAddressAdded(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <div className="min-h-[64vh] bg-gray-800 text-white flex items-center p-12 flex-col">
      {addressAdded && (
        <h2 className="text-green-600 text-lg">Address added successfully</h2>
      )}
      <form
        className="w-1/2 flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-lg  ">Name</h3>
        <input
          className="text-white w-1/2 rounded-md h-8 bg-slate-700 "
          {...register("name", {
            required: { value: true, message: "Name is required" },
          })}
        />
        {errors.name && (
          <div className="text-red-500 text-lg">{errors.name.message}</div>
        )}
        <h3 className="text-lg">Address1</h3>
        <input
          className="text-white w-1/2 rounded-md h-8 bg-slate-700 "
          type="text"
          {...register("address1", {
            required: { value: true, message: "Address1 is required" },
          })}
        />
        {errors.address1 && (
          <div className="text-red-500 text-lg">{errors.address1.message}</div>
        )}

        <h3 className="text-lg">Address2</h3>
        <input
          className="text-white w-1/2 rounded-md h-8 bg-slate-700 "
          type="text"
          {...register("address2")}
        />
        {errors.address2 && (
          <div className="text-red-500 text-lg">{errors.address2.message}</div>
        )}

        <h3 className="text-lg">District</h3>
        <input
          className="text-white w-1/2 rounded-md h-8 bg-slate-700 "
          type="text"
          {...register("district", {
            required: { value: true, message: "District is required" },
          })}
        />
        {errors.district && (
          <div className="text-red-500 text-lg">{errors.district.message}</div>
        )}

        <h3 className="text-lg">State</h3>
        <input
          className="text-white w-1/2 rounded-md h-8 bg-slate-700 "
          type="text"
          {...register("state", {
            required: { value: true, message: "State is required" },
          })}
        />
        {errors.state && (
          <div className="text-red-500 text-lg">{errors.state.message}</div>
        )}

        <h3 className="text-lg">Pincode</h3>
        <input
          className="text-white w-1/2 rounded-md h-8 bg-slate-700 "
          type="text"
          {...register("pincode", {
            required: { value: true, message: "Pincode is required" },
          })}
        />
        {errors.pincode && (
          <div className="text-red-500 text-lg">{errors.pincode.message}</div>
        )}
        <h3 className="text-lg">Phone number</h3>

        <input
          className="text-white w-1/2 rounded-md h-8 bg-slate-700 "
          type="phone"
          {...register("phone", {
            required: { value: true, message: "Phone number is required" },
          })}
        />
        {errors.phone && (
          <div className="text-red-500 text-lg">{errors.phone.message}</div>
        )}

        <div className="butto w-1/2 text-center mt-4">
          <input
            disabled={isSubmitting}
            className="w-1/2 text-center bg-red-900 rounded-md h-8 p-1 cursor-pointer"
            type="submit"
            value="Add Address"
          />
          {isSubmitting && (
            <div className="text-white text-lg">Submitting...</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
