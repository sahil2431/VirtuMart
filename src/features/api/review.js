import axiosInstance from "../../utils/axios";

const addReview = async({rating , review , productId}) => {

    return await axiosInstance.post("/review/create" , {rating , review , productId} , {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((res) => {
        console.log(res.data)
        return res.data
    })
    .catch((err) => {
        console.log(err)
        return err.response.data
    })
    
}


export {addReview}