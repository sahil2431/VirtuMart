import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/product/create", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const getProduct = createAsyncThunk("/product/getAllProduct", async () =>{
    const response = await axiosInstance.get("/product/getAllProducts");
    return response.data;
  })

  export const getProductDetails = createAsyncThunk("/product/getProductDetails", async (data) =>{
    const response = await axiosInstance.post("/product/productDetails", data)
    return response.data;
  })

  export const productSearch = createAsyncThunk("/product/search", async (data) =>{
    const response = await axiosInstance.post("/product/search", {search : data});
    return response.data;
  })

  export const getProductByCategory = createAsyncThunk("/product/getProductByCategory", async (data) =>{
    const response = await axiosInstance.post("/product/getProductByCategory", {categoryId : data});
    return response.data;
  })

  export const filterProducts = createAsyncThunk("/product/filterProducts", async (data) =>{
    const response = await axiosInstance.post("/product/filterProducts", data);
    return response.data;
  })


const initialState = {
  products: [],
  product : {},
  isLoading: false,
  error: "",
  productAdded: {},
  message : ""
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.productAdded = action.payload.data.product;
        state.isLoading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(action.error.message);
        state.isLoading = false;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(action.error.message);
        state.isLoading = false;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.product = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message
      })
      .addCase(getProductDetails.rejected , (state , action) =>{
        state.error = action.error.message,
        state.isLoading = false
      })
      .addCase(productSearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(productSearch.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message
      })
      .addCase(productSearch.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        state.products = []
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(filterProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        state.products = []
      })
      

  },
});

export default productSlice.reducer;
