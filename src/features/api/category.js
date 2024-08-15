import axiosInstance from "../../utils/axios";

const getCategories = async () => {
  return await axiosInstance
    .get("/category/get")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message || "Error while fetching categories");
      throw err;
    });
}

export {getCategories}