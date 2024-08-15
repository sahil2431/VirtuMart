import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import {toast} from "react-toastify"
export const login = createAsyncThunk("/signin", async (data) => {
  const response = await axiosInstance.post("/users/signin", data, {});
  return response.data;
});

export const signup = createAsyncThunk("/signup", async (data) => {
  const reponse = await axiosInstance.post("/users/signup", data);
  return reponse.data;
});

export const logout = createAsyncThunk("/logout", async (accessToken) => {
  const response = await axiosInstance.post(
    "/users/logout",
    { body: null },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
});

export const getCurrentUserDetails = createAsyncThunk(
  "/getCurrentUserDetails",
  async () => {
    const response = await axiosInstance.get("/users/getCurrentUserDetails", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  }
);

export const verifyEmailLink = createAsyncThunk(
  "/emailVerify",
  async (data) => {
    const response = await axiosInstance.post("/users/emailVerify", {
      token: data,
    });
    return response.data;
  }
);

export const resendLink = createAsyncThunk(
  "/resendEmailVerificationLink",
  async (data) => {
    const response = await axiosInstance.post(
      "/users/resendEmailVerificationLink",
      { email: data }
    );
    return response.data;
  }
);

export const deleteAccount = createAsyncThunk(
  "/deleteAccount",
  async (data) => {
    console.log(data);
    const response = await axiosInstance.delete(
      "/users/deleteAccount",
      {
        data: { password: data },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return response.data;
  }
);

const initialState = {
  isAdmin: false,
  accessToken: null,
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  message: "",
  emailVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        toast.info("logging in...")
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.data.user.userType === "ADMIN") {
          state.isAdmin = true;
        }
        state.accessToken = action.payload.data.accessToken;
        localStorage.setItem("accessToken", action.payload.data.accessToken);
        localStorage.setItem("refreshToken", action.payload.data.refreshToken);
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.message = action.payload.message;
        toast.success("Login successfull")
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(action.error);
        state.isLoggedIn = false;
        toast.error("Error while loggin")
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;

        state.message = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(action.error.message);
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.accessToken = null;
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isAdmin = false;
        state.message = action.payload.message;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.success("Logout Succesfully");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(getCurrentUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        if (action.payload.data.user.userType === "ADMIN") {
          state.isAdmin = true;
        }

        state.error = action.payload.statusText;

        state.isLoading = false;
      })
      .addCase(getCurrentUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(action);
        state.isLoggedIn = false;
      })
      .addCase(verifyEmailLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmailLink.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        state.emailVerified = true;
        if (action.payload.data.user.userType === "ADMIN") {
          state.isAdmin = true;
        }
      })
      .addCase(verifyEmailLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(action.error.message);
        state.isLoggedIn = false;
      })
      .addCase(resendLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendLink.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resendLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(action.error.message);
        state.isLoggedIn = false;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.message = action.payload.message;
        state.isLoggedIn = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export default authSlice.reducer;
