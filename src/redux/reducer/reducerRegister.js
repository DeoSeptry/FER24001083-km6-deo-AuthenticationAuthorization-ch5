import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editEmail: "",
  editPassword: "",

  editData: [],
};

const dataSlicer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setEditEmail: (state, action) => {
      state.editEmail = action.payload;
    },
    setEditPassword: (state, action) => {
      state.editPassword = action.payload;
    },
    setEditData: (state, action) => {
      state.editData = action.payload;
    },

    logOut: (state) => {
      state.editEmail = "";
      state.editPassword = "";
      state.editName = "";
      state.editData = [];
      state.messege = "";
    },
  },
});

export const {
  setEditEmail,
  setEditPassword,
  setEditData,

  logOut,
} = dataSlicer.actions;

export default dataSlicer.reducer;
