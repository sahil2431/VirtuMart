import axiosInstance from "../../utils/axios";

const createOrder = async (data) => {
    try {
        const response = await axiosInstance.post("/payment/create-order", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const verifyPayment = async (data) => {
    try {
        const response = await axiosInstance.post("/payment/verify-payment", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { 
    createOrder,
    verifyPayment
}