import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import {toast} from "react-toastify"
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isAdmin, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      toast.info("Redirecting to admin dashboard")
      window.location.href = "/admin/dashboard?userId=" + user.Id;
    } else if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, isAdmin]);

  const onSubmit = async (data) => {
    try {
      dispatch(login(data));
    } catch (error) {
    }
  };

  return (
    <div className='text-white min-h-[50vh] bg-no-repeat bg-cover bg-fixed bg-[url("https://t3.ftcdn.net/jpg/01/17/33/22/360_F_117332203_ekwDZkViF6M3itApEFRIH4844XjJ7zEb.jpg")] w-scren'>
      <div className="flex flex-col justify-center gap-5 items-center h-[70vh]">
        {errors.login && (
          <div className="text-red-500 text-lg">{errors.login.message}</div>
        )}
        {isLoggedIn && (
          <div className="text-green-500 text-lg">You are logged in</div>
        )}
        <h1 className="font-bold text-4xl w-1/2 ">Login</h1>
        <p className="w-1/2">Welcome back</p>

        <form
          className="w-1/2 flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-lg">User Id</h3>
          <Controller
            name="userId"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <input
                {...field}
                className="text-white w-1/2 rounded-md h-8 bg-slate-700"
              />
            )}
          />
          {errors.userId && (
            <div className="text-red-500">{errors.userId.message}</div>
          )}
          <h3 className="text-lg">Password</h3>
          <Controller
            name="password"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="text-white w-1/2 rounded-md h-8 bg-slate-700"
              />
            )}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
          <Link to="/forgotPassword">
            <p className="w-1/2 text-end cursor-pointer text-blue-600">
              Forgot Password
            </p>
          </Link>
          <div className="butto w-1/2 text-center">
            <input
              disabled={isSubmitting}
              className="w-1/2 text-center bg-red-900 rounded-md h-8 p-1 cursor-pointer"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <div className="signup w-1/2">
          <p className="w-1/2 text-end">New User?</p>
          <Link to="/signup">
            <input
              className="w-1/2 cursor-pointer text-end text-blue-600"
              type="button"
              value="SignUp"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
