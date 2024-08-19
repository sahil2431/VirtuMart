import React , {useState , useEffect} from "react";
import Card from "../components/Products/Card";
import Carousel from "../components/Home/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/productSlice";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import SearchBar from "../components/Home/SearchBar";
import { getCategories } from "../features/api/category";
import CategoryButton from "../components/Category/CategoryButton";

const Home = () => {
  const {products , isLoading} = useSelector((state) => state.product);

  const [animate, setAnimate] = useState(false);
  const [categories , setCategories] = useState([])

  const dispatch = useDispatch();
  useEffect(() =>{

    const getCategory =async () => {
      const data = await getCategories()
      if(data.statusCode) setCategories(data.data)
    }
    dispatch(getProduct());
    setAnimate(true)
    getCategory()
    
  } ,[])

 

  useEffect(() => {
    if (animate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [animate]);
 if(isLoading) {
  return <Loading/>
 } 
  return (
    <>
    <motion.div
    
    className={`min-h-screen bg-gray-800 relative overflow-hidden`}>
      <Carousel />

      <div className="flex justify-center gap-2">
      <SearchBar  />
  
      </div>

      <div>
        {categories.length > 0 && <div className="flex flex-wrap justify-center items-center p-5">
          <CategoryButton text="All" categoryId={"all"} />
          {categories.map((category) => 
          <CategoryButton key={category._id} text={category.name} categoryId={category._id}/>
          )}
          </div>}
      </div>

      {products.length === 0 && (
        <div className="flex justify-center items-center min-h-[20vh]">
        <p className="text-red-500 text-2xl font-bold">No Product Found</p>
        </div>
      )}
        <div className="flex flex-wrap text-black justify-center">
          {products.map((product) => (
            <Card 
            width='md:w-72 xs:w-52 w-40'
            height="md:h-96 xs:h-80 h-72"
            imageHeight="md:h-72 xs:h-52 h-40"
            key={product._id} 
            product={product} />
          ))}
        </div>
      {animate && <motion.div 
        className="absolute inset-0 bg-black max-h-screen"
        initial={{ y: 0 }}
        animate={{y : "100%"}}
        transition={{ duration: 3, ease: "easeOut" , delay : 3}}
        onAnimationComplete={() => setAnimate(false) }
      >
        <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">

        
        <motion.p
        initial = {{opacity : 0 , y : -20}}
        animate = {{opacity : 1 , y : 0}}
        transition={{duration : 1 , delay : 0.5}}
        className="text-white text-3xl font-bold"
        >
          Welcome to Shopping
        </motion.p>
        <motion.h3
        initial = {{opacity : 0 , y : 30}}
        animate = {{opacity : 1 , y : 0 , transition:{duration : 1 , delay : 1}}}
        
       
        
        
        >
          <Logo />
        </motion.h3>
        </div>
      </motion.div>}
    </motion.div>
    </>
  );
};

export default Home;
