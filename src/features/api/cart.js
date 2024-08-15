import axiosInstance from "../../utils/axios";

const getCart = async () => {
  return await axiosInstance
    .get("/cart/get", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.message || "Error while fetching cart");
      throw err;
    });
};

const updateQuantity = async (cartId, quantity) => {
  return await axiosInstance
    .patch(
      "/cart/updateQuantity",
      {
        cartId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.message || "Error while updating cart");
      throw err;
    });
};

const addItemToCart = async (productId, quantity) => {
  return await axiosInstance
    .post(
      "/cart/addItem",
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {

      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

const clearCart = async () => {
  return await axiosInstance
    .delete("/cart/clear", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      return "Cart cleared successfully";
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

const removeItem = async (cartId) => {

  return await axiosInstance
    .delete("/cart/removeItem", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: { cartId },
    })
    .then((res) => {
      return "Item removed successfully";
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};
export { getCart, updateQuantity, addItemToCart, clearCart, removeItem };
