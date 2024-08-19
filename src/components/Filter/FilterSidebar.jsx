import React, { useState , useEffect } from "react";
import SearchBar from "../Home/SearchBar";
import Filter from "./Filter";
import { getCategories } from "../../features/api/category";
import Button from "./Button";

import { useNavigate } from "react-router-dom";


const FilterSidebar = ({
  
}) => {

  
  const [clearSelection, setClearSelection] = useState(false);
  const [isCategories, setIsCategories] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [ratings , setRatings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [prices , setPrices] = useState([]);
  const [available, setAvailable] = useState([{_id : 1 , name : "Available"} , {_id : 2 , name : "Not Available"}]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [filterVisible , setFilterVisible] = useState(false)
 
  const navigate = useNavigate()
  
  const handleApply = () => {
    let price = {}
    let rating = {}
    let availability = false
    let categoryId = null
    if(selectedPrice === "Under 500") {
      price = {min : 0 , max : 500}
    }else if(selectedPrice === "Above 10000") {

      price = {min : 10000 , max : 1000000}
    }else if(selectedPrice) {
      const priceArray = selectedPrice.split(" - ");
      price = {min : parseInt(priceArray[0]) , max : parseInt(priceArray[1])} 
    }
    if(selectedAvailability === "Available") {
      availability = true
    }
    if(selectedRating === "below 1") {
      rating = {min : 0 ,max : 1}
    }else if(selectedRating === "above 4") {
      rating = {min : 4 , max : 5}
    }else if(selectedRating) {
      const ratingArray = selectedRating.split(" - ");
      rating = {min : parseInt(ratingArray[0]) , max : parseInt(ratingArray[1])}
    }
    if(selectedCategory) {
      categoryId = categories.find((category) => category.name === selectedCategory)?._id

    }
    
    const queryParams = new URLSearchParams();
    if (categoryId) queryParams.append("categoryId", categoryId);
    if (price.min !== undefined && price.max !== undefined) {
      queryParams.append("priceMin", price.min);
      queryParams.append("priceMax", price.max);
  }
    if (rating.min !== undefined && rating.max !== undefined) {
        queryParams.append("ratingMin", rating.min);
        queryParams.append("ratingMax", rating.max);
    }
    if (availability) queryParams.append("availability", availability);
    
    navigate(`/products?${queryParams.toString()}`);
  }

  const handleClear = () => {
    setSelectedCategory(null)
    setSelectedPrice(null)
    setSelectedAvailability(null)
    setSelectedRating(null)
    setClearSelection(true)
    navigate("/products")
    setTimeout(() => setClearSelection(false), 1);
  }
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories()
            setCategories(data.data)
        }

        setRatings([
          {_id : 1 , name : "below 1"},
          {_id : 2 , name : "1 - 2"},
          {_id : 3 , name : "2 - 3"},
          {_id : 4 , name : "3 - 4"},
          {_id : 5 , name : "above 4"},
          
        ])
        setPrices([
          {_id : 1 , name : "Under 500"},
          {_id : 2 , name : "500 - 1000"},
          {_id : 3 , name : "1000 - 2000"},
          {_id : 4 , name : "2000 - 5000"},
          {_id : 5 , name : "5000 - 10000"},
          {_id : 6 , name : "Above 10000"},
        ])
        fetchCategories()
    } ,[])

    
  return ( 
    <>
    <div className={`xl:w-[20vw] sm:w-[25vw] bg-black border-2 border-white sm:h-[92vh] h-[30vh] sm:block  `}>
    <div className={`sm:w-[25vw] xl:w-[20vw] flex justify-center items-center p-4`}>
        <SearchBar width={`md:w-[15vw] sm:w-[20vw]`} />
      </div>
      <ul className="text-white p-2 sm:min-h-[70vh] sm:flex sm:flex-col grid grid-cols-2">
        <li>
          <button
          onClick={() => {
            setIsCategories(!isCategories)
            setIsPrice(false)
            setIsRating(false)
            setIsAvailable(false)
          }}
            type="button"
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              Categories
            </span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isCategories && (
            
            <Filter array={categories} selectedValue={selectedCategory} onClick={(value) => setSelectedCategory(value)} clearSelection={clearSelection}/>
            
          )
          }
        </li>

        <li>
          <button
          onClick={() => {
            setIsCategories(false)
            setIsPrice(!isPrice)
            setIsRating(false)
            setIsAvailable(false)
          }}
            type="button"
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              Price
            </span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {
            isPrice && (
              <Filter array={prices} selectedValue={selectedPrice} onClick={(value) => setSelectedPrice(value)} clearSelection={clearSelection}/>
            )
          }
        </li>

        <li>
          <button
            type="button"
            onClick={() => {
              setIsCategories(false)
              setIsPrice(false)
              setIsRating(false)
              setIsAvailable(!isAvailable)
            }}
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              Available
            </span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {
            isAvailable && (
              <Filter array={available} selectedValue={selectedAvailability} onClick={(value) => setSelectedAvailability(value)} clearSelection={clearSelection}/>
            )
          }
        </li>

        <li>
          <button
            type="button"
            onClick={() => {
              setIsCategories(false)
              setIsPrice(false)
              setIsRating(!isRating)
              setIsAvailable(false)
            }}
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              Rating
            </span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {
            isRating && (
              <Filter array={ratings} selectedValue={selectedRating} onClick={(value) => setSelectedRating(value)} clearSelection={clearSelection}/>
            )
          }
        </li>
      </ul>

      <div className="flex gap-3 justify-center items-center p-4">
        <Button 
        onclick={handleApply}
        text="Apply" 
        className={"hover:scale-110 "} />
        <Button 
        onclick={handleClear}
        text="Clear" 
        className={"hover:scale-110"} />
      </div>
    </div>
    </>
  );
};

export default FilterSidebar;
