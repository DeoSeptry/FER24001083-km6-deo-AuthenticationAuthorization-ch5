import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editEmail: "",
  editPassword: "",
  items: "",
  data: [],
  token: null,
  editName: "",
  messege: "",
};

const dataSlicer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.editEmail = action.payload;
    },
    setPassword: (state, action) => {
      state.editPassword = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setName: (state, action) => {
      state.editName = action.payload;
    },
    setMessege: (state, action) => {
      state.messege = action.payload;
    },
    logout: (state) => {
      state.editEmail = "";
      state.editPassword = "";
      state.data = [];
      state.token = null;
    },

    clearLogin: (state) => {
      state.editEmail = "";
      state.editPassword = "";
      state.token = null;
    },
    clearRegister: (state) => {
      state.editEmail = "";
      state.editPassword = "";
      state.editName = "";
      state.messege = "";
    },
  },
});

export const {
  setEmail,
  setPassword,
  setItems,
  setData,
  setToken,
  logout,
  clearLogin,
  setName,
  setMessege,
  clearRegister,
} = dataSlicer.actions;

export default dataSlicer.reducer;
