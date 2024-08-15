import axiosInstance from "../../utils/axios";

const fetchWishlist = async () => {
  return await axiosInstance.get("/wishlist/getProducts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
  .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.message || "Error while fetching wishlist")
      throw  err;
    })
};

const removeProduct = async(productId) => {
  return await axiosInstance.delete("/wishlist/remove" ,{
    headers : {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    data : {productId}
})
.then((res) => {
  return res.data
})
.catch((err) => {
  console.log(err)
  return err;
})
}

const addProduct = async(productId) => {
  return await axiosInstance.post("/wishlist/add" , {productId} , {
    headers : {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((err) => {
    console.log(err)
    throw err
  })

}

export {
  fetchWishlist,
  removeProduct,
  addProduct
};