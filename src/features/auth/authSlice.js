import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
    },
    resendCode: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const { register, resendCode, login, logout } = authSlice.actions;
export default authSlice.reducer;
