import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.user = action.payload.user;
      state.token = action.action.token;
      localStorage.getItem("token", action.payload.token);
      localStorage.getItem("user", action.payload.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;
