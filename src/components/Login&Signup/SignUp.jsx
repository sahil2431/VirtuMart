import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/authSlice";
import { Navigate } from "react-router-dom";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,

    formState: { errors, isSubmitting },
  } = useForm();

  const {isLoggedIn} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isRefreshed, setIsRefreshed] = useState(false);
  useEffect(() => {
    if (isRefreshed) {
      setIsRefreshed(false);
    }
  }, []);

  const {isLoading , message , error} = useSelector((state) => state.auth);
  const onSubmit = async (data) => {
    setIsRefreshed(true);
    dispatch(signup(data))
  };

  const navigate = useNavigate()
  if(isLoggedIn) navigate("/")
  return (
    <div className='p-5 text-white  bg-no-repeat bg-cover bg-fixed bg-[url("https://t3.ftcdn.net/jpg/01/17/33/22/360_F_117332203_ekwDZkViF6M3itApEFRIH4844XjJ7zEb.jpg")] w-screen'>
      <div className="flex flex-col justify-center gap-4 items-center min-h-[70vh] '">
        {isLoading && !isSubmitting ? (
          <div className="text-green-500 text-lg">{message}</div>
        ) : null}
        {errors.sigup && (
          <div className="text-red-500 text-lg">{errors.sigup.message}</div>
        )}
        {error && isRefreshed && (
          <div className="text-red-500 text-lg">{error}</div>
        )}
        <h1 className="font-bold text-4xl md:w-1/2 w-3/4 ml-[15vw] ">SignUp</h1>
        <form
          className="md:w-1/2 sm:w-[70vw] w-[80vw] flex flex-col gap-[2px] ml-[15vw]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-lg  ">Name</h3>
          <input
            className="text-white lg:w-1/2 w-3/4 rounded-md h-8 bg-slate-700 "
            {...register("name", {
              required: { value: true, message: "Name is required" },
            })}
          />
          {errors.name && (
            <div className="text-red-500 text-lg">{errors.name.message}</div>
          )}
          <h3 className="text-lg  ">Email</h3>
          <input
            className="text-white lg:w-1/2 w-3/4 rounded-md h-8 bg-slate-700 "
            type="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
            })}
          />
          {errors.email && (
            <div className="text-red-500 text-lg">{errors.email.message}</div>
          )}
          <h3 className="text-lg  ">Mobile Number</h3>
          <input
            className="text-white lg:w-1/2 w-3/4 rounded-md h-8 bg-slate-700 "
            type="phone"
            {...register("mobile", {
              required: { value: true, message: "Number is required" },
            })}
          />
          {errors.mobile && (
            <div className="text-red-500 text-lg">{errors.mobile.message}</div>
          )}
          <h3 className="text-lg  ">User Id</h3>
          <input
            className="text-white lg:w-1/2 w-3/4 rounded-md h-8 bg-slate-700 "
            type="text"
            {...register("userId", {
              required: { value: true, message: "UserId is required" },
            })}
          />
          {errors.userId && (
            <div className="text-red-500 text-lg">{errors.userId.message}</div>
          )}
          <h3 className="text-lg  ">Password</h3>
          <input
            className="text-white lg:w-1/2 w-3/4 rounded-md h-8 bg-slate-700 "
            type="password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
          />
          {errors.password && (
            <div className="text-red-500 text-lg">
              {errors.password.message}
            </div>
          )}
          <div className="butto lg:w-1/2 w-3/4 text-center mt-4">
            <input
              disabled={isSubmitting}
              className="w-1/2 text-center bg-red-900 rounded-md h-8 p-1 cursor-pointer"
              type="submit"
              value="SignUp"
            />
            {isSubmitting && (
              <div className="text-white text-lg">Submitting...</div>
            )}
          </div>
        </form>

        <div className="signup ml-[15vw] lg:w-1/2 w-3/4">
          <p className="lg:w-1/2 w-3/4 text-end">Already Reagistered?</p>
          <Link to="/login">
            <input
              className=" lg:w-1/2 w-3/4  cursor-pointer text-end text-blue-600"
              type="button"
              value="Login"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
