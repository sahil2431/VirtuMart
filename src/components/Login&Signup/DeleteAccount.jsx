import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '../../features/authSlice'
import { Link } from'react-router-dom';
import NotLoggedIn from './NotLoggedIn';
import BackBtn from '../BackBtn';
const DeleteAccount = () => {
    const [password, setPassword]  = useState('')
    const [confirmPassword, setConfirmPassword]  = useState('')

    const {isLoggedIn} = useSelector((state) => state.auth)    
    const dispatch = useDispatch()
    const handleDeleteAccount = async () =>{
        if(password !== confirmPassword) {
            alert("Passwords do not match")
        } else {
          console.log(password)
            dispatch(deleteAccount(password))
        }
    }

    if(!isLoggedIn) return <NotLoggedIn/>

    return (
    <div className='min-h-[60vh] p-5 '>
      <h1 className='text-center text-red-600 text-xl font-bold'>Delete Account</h1>
      <form className="flex flex-col gap-3 text-lg items-center mt-8">
        <label >Enter Password</label>
        <input 
        className="text-white w-[25vw] rounded-md h-8 bg-slate-700 p-5 "
        onChange={(e) => setPassword(e.target.value)}
        type="password" 
        placeholder="Password" 
        />

        <label htmlFor="">Confirm Password</label>
        <input 
        className="text-white w-[25vw] rounded-md h-8 bg-slate-700 p-5 "
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password" 
        placeholder="Confirm Password" 
        />

        <button
        className="mt-10 w-[15vw] text-center bg-red-700 rounded-md p-3 cursor-pointer"
        onClick={handleDeleteAccount}
        >Delete Account
        </button>
        <BackBtn/>
      </form>

    </div>
  )
}

export default DeleteAccount
