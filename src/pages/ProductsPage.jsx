import React, { useEffect} from 'react'
import { useSelector ,  useDispatch } from 'react-redux'
import Card from '../components/Products/Card'  
import { Loading } from '../components';
import FilterSidebar from '../components/Filter/FilterSidebar';
import { useSearchParams } from "react-router-dom";
import { filterProducts, getProduct, getProductByCategory, productSearch } from '../features/productSlice';


const ProductsPage = () => {
    const {products}  = useSelector((state) => state.product);
    const {isLoading} = useSelector((state) => state.product);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const availability = searchParams.get("availability");
    const search = searchParams.get("search");
    const ratingMin = searchParams.get("ratingMin");
    const ratingMax = searchParams.get("ratingMax");

    const price = priceMin && priceMax ? {min : priceMin , max : priceMax} : null
    const rating = ratingMin && ratingMax ? {min : ratingMin , max : ratingMax} : null
  
    
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchProducts = async () => {
        if(!search && !price && !availability && !rating && (!categoryId || categoryId === "all")) {
          dispatch(getProduct())
          return 
        }
        if(search) {
          dispatch(productSearch(search))
          return
        }
        if(price || availability || categoryId || rating) {
          dispatch(filterProducts({categoryId, price, availability , rating}))
          return
        }
      }

      fetchProducts()
    } , [categoryId, dispatch, priceMin , priceMax, availability,ratingMax , ratingMin, search])

    if(isLoading) return <Loading/>
    
  return (
    <div className='min-h-[65vh]'>

      <div className='flex'>

      <FilterSidebar  />


{products.length === 0 && (
        <div className="flex justify-center items-center min-h-[20vh] w-[80vw]">
        <p className="text-red-500 text-2xl font-bold">No Product Found</p>
        </div>
      )}
      <div className="flex flex-wrap text-black justify-center">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
