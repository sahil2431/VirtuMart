import { useEffect, useState } from "react";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getCurrentUserDetails } from "./features/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  Route,

  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation
} from "react-router-dom";
import Layout from "./Layout"
import {
  Login,
  SignUp,
  UserDashboard,
  AccountInfo,
  DeleteAccount,
  EditDetails,
  UpdatePassword,
  ProductPage,
  NotLoggedIn,
  CartPage,
  AllOrders,
  WishlistPage,
  Address,
  AddAddress,
  OrderPage,
  Verify,
  ErrorPage,
  Loading,
  OrderSucces,
  ForgotPassword,
  ResetPassword,
  OrderDetail
} from "./components/index"


import {
  Home,
  About,
  Contact,
  ProductsPage
} from "./pages/index"

function App() {


   
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path = "" element={<Home/>} />
          <Route path = "about" element={<About/>} />
          <Route path = "contact" element = {<Contact/>}/>
          <Route path="forgotPassword" element = {<ForgotPassword/>} />
          <Route path="resetPassword/:token" element = {<ResetPassword/>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile/:userName/:userId" element = {<UserDashboard/>} />
          <Route path="accountInformation/:userName/:userId" element={<AccountInfo />} />
          <Route path="deleteAccount/:userName" element = {<DeleteAccount />}/>
          <Route path="updateAccountDetails/:userName/:userId" element = {<EditDetails />}/>
          <Route path="updatePassword/:userName/:userId" element = {<UpdatePassword />}/>
          <Route path="productDetails" element = {<ProductPage/>}/>
          <Route path="loginError" element={<NotLoggedIn/>} />
          <Route path="cart/:userName/:userId" element={<CartPage/>} />
          <Route path="products" element={<ProductsPage/>} />
          <Route path="orders/:userName/:userId" element={<AllOrders/>} />
          <Route path="wishlists/:userName/:userId" element={<WishlistPage />} />
          <Route path="address/:username/:userId" element={<Address/> }/>
          <Route path="addAddress/:username/:userId" element = {<AddAddress/>} />
          <Route path="orderConfirm/:username/:userId" element = {<OrderPage/>} />
          <Route path="orderConfirm/:userName/:userId/success" element={<OrderSucces/>} />
          <Route path="orderDetails/:userName/:orderId/:productId" element = {<OrderDetail/>} />
        </Route>
        <Route path="/verify" element = {<Verify/>} />
        
        <Route path="*" element = {<ErrorPage/>}/>
      </Route>
    )
  );
  const {isLoading} = useSelector((state) => state.auth)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCurrentUserDetails());
  }, []);
  if(isLoading) {
    return <Loading/>
  }
  return (
    <>
      
        <RouterProvider router={router} />
         <ToastContainer
         position="top-center"
         autoClose={3000}
         hideProgressBar={true}
         theme="dark"
         />
    </>
  );
}

export default App;
