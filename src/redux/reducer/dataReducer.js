import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  surah: [],
  surahId: null,
  detail: null,
  bahasa: "",
  arti: [],
  nomor: "",
  editAyah: [],
};

const dataSlicer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSurah: (state, action) => {
      state.surah = action.payload;
    },
    setSurahId: (state, action) => {
      state.surahId = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
    setBahasa: (state, action) => {
      state.bahasa = action.payload;
    },
    setArti: (state, action) => {
      state.arti = action.payload;
    },
    setNomor: (state, action) => {
      state.nomor = action.payload;
    },
    setEditAyah: (state, action) => {
      state.editAyah = action.payload;
    },
  },
});

export const {
  setSurah,
  setSurahId,
  setDetail,
  setBahasa,
  setArti,
  setNomor,
  setEditAyah,
} = dataSlicer.actions;

export default dataSlicer.reducer;
