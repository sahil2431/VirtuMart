import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import { Link, useLocation } from 'react-router-dom';
import ProductNotFound from '../Error/ProductNotFound';
import { getProductDetails } from '../../features/productSlice';
import ProductDetail from './ProductDetail';
import Reviews from './Reviews';
import UserReviewfField from './UserReviewfField';
const ProductPage = () => {
    const {isLoggedIn , user} = useSelector((state) => state.auth);
    const {product , isLoading} = useSelector((state) => state.product)
    const [productFetched , setProductFetched] = useState(false)
    
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('id')

  if(!productId || productId === 'undefined') {
    return <ProductNotFound/>
  }
  const dispatch = useDispatch()
  useEffect(() => {
    const userId = user?._id
    dispatch(getProductDetails({productId , userId}))
    setProductFetched(true)
  } , [productId , user?._id , dispatch , productFetched])

  if(isLoading) {
    return <Loading/>
  }
  if(!product) {
    return <ProductNotFound/>
  }
  

  return (
    <div className='bg-gray-800 text-white'>
    <div className=" max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]" >
    <ProductDetail product={product} onProductChange={() => setProductFetched(false)}/>
    

    </div>
    
    <div className='flex items-center flex-col md:flex-row md:justify-evenly py-5' >

    <UserReviewfField onReview={() => setProductFetched(false)} productId={product._id}/>
    {product.reviews?.length > 0 && <Reviews reviews={product.reviews}/>}
    </div>
    </div>
  );
};

export default ProductPage;
