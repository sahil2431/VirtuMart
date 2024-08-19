import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const SearchBar = ({  
  className ,
   width  = "50vw"
  }) => {
  const [searchTerm, setSearchTerm] = React.useState('')

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(searchTerm === '') {
      return
    }
    navigate(`/products?search=${searchTerm}`)
  }

  const handlesearch = (e) => {
    
    setSearchTerm(e.target.value)
  }

  return (
    
    <form onSubmit={handleSubmit} className='relative'
      >
        <input type="text" value={searchTerm} onChange={handlesearch} placeholder="Search..." className={`flex-1 block ${width} appearance-none leading-5 transition duration-150 ease-in-out px-10 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue sm:text-sm sm:leading-5`}
          aria-label="Search input field"
          aria-describedby="search-button"
          aria-invalid={searchTerm ? false : true}
        />
      
        <button type="submit" id="search-button" className={`top-1 absolute flex items-center justify-center left-[${width-7}] px-3 py-2 border border-transparent text-black bg-transparent rounded-md shadow-sm lg:left-[${width-3}] sm:left-[${width-5}] `}
          >

          <FaSearch   />
        </button>
      
      </form>
    
  )
}

export default SearchBar
