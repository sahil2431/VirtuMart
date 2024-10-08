import React, { useState ,  } from 'react'
import RemoveBtn from '../Cart/RemoveBtn'
import { removeAddres } from '../../features/api/address'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const AddressCard = ({address , onAddressChange , btn = true}) => {

    const { user } = useSelector((state) => state.auth);
    const [addressRemoved , setAddressRemove] = useState()
    const handleAddressRemove = async() => {
        const data= await removeAddres(address._id)
        if(data.statusCode) {
            setAddressRemove(true)
            setTimeout(() => {
                setAddressRemove(false)

            } , 2000)
            onAddressChange()
        }
    }

    const addressDetail = (
      <div className = "w-[60vw]">
      <div className='mb-5'>
        <span className='text-lg font-bold mb-5'>{address?.name}</span>
      </div>
      <div className='max-xs:text-sm'>
        <span>Address1 : </span>
        <span>{address?.address1}</span>
      </div>
      <div className='max-xs:text-sm'>
        <span>Address2 : </span>
        <span>{address?.address2}</span>
      </div>
      <div className='max-xs:text-sm'>
        <span>District : </span>
        <span>{address?.district}</span>
      </div>
      <div className='max-xs:text-sm'>
        <span>State : </span>
        <span>{address?.state}</span>
      </div>
      <div className='max-xs:text-sm'>
        <span>Pincode : </span>
        <span>{address?.pincode}</span>
      </div>
      <div className='max-xs:text-sm'>
        <span>Mobile number : </span>
        <span>{address.phone}</span>
      </div>
      </div>
    )

  return (
    <div className='sm:w-[70vw] w-[90vw] border-white p-4 border-2 flex justify-between items-center'>
      {addressRemoved && <h1 className="text-red-600 text-lg">Address removed successfully</h1>}
    {btn ? <Link 
    className='xs:w-[60vw] w-[75vw]'
          to={`/orderConfirm/${user.userId}/${user._id}`} state={{address}}
          >
            {addressDetail}
      
      </Link> : addressDetail}
      
      {btn && <RemoveBtn
      
            removeId={address?._id}
            onRemove={handleAddressRemove}
            className='h-14'
            />}
    </div>
  )
}

export default AddressCard
