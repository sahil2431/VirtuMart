
import axiosInstance from "../../utils/axios";


const addOrder = async(data) => {
    try {
        const response = await axiosInstance.post(`/order/create` , data, {
            headers  : {
                Authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getAllOrders = async() => {
    try {
        const response = await axiosInstance.get("/order/getAll" , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        return response.data
    }catch(error) { 
        console.log(error)
        throw error
    }
}

const getOrderById = async(orderId , productId) => {
   return await axiosInstance.get(`/order/getOrderById/${orderId}/${productId}` , {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        console.log(err.response.data)
        return err.response.data
    })
}

export  {addOrder , getAllOrders , getOrderById}