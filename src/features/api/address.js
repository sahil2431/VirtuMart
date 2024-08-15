import axiosInstance from "../../utils/axios";

const getAllAdress = async() => {
    return await axiosInstance.get("/address/getAddress" , {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((res) => {
        return res.data.data
    })
    .catch((err) => {
        console.log(err)
        return err
    })
}

const addAddress = async(data) => {
    return await axiosInstance.post("/address/add" , data , {
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
        return err
    })
}

const removeAddres = async(addressId) => {
    return await axiosInstance.delete("/address/delete" , {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`
        },
        data: { addressId },
    })
    .then((res) => {
    
        return res.data
    })
    .catch((err) => {
        console.log(err)
        return err
    })

}
export {getAllAdress , addAddress , removeAddres}