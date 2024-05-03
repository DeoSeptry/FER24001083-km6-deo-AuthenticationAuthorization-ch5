import axios from "axios";
import {
  setSurah,
  setDetail,
  setArti,
  setEditAyah,
} from "../reducer/dataReducer";

export const getQuran = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`http://api.alquran.cloud/v1/surah`);
    console.log("REDUX response", response.data.data);
    dispatch(setSurah(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getQuranDetail = () => async (dispatch, getState) => {
  try {
    const id = getState().data.surahId;
    const response = await axios.get(
      `http://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
    );
    console.log("REDUX detail", response.data.data);
    dispatch(setDetail(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getTerjemahan = () => async (dispatch, getState) => {
  try {
    const bahasa = getState().data.bahasa;
    console.log("bahasa", bahasa);
    const id = getState().data.surahId;
    const response = await axios.get(
      `http://api.alquran.cloud/v1/surah/${id}/${bahasa}`
    );
    console.log("REDUX arti", response.data.data);
    dispatch(setArti(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getAyah = () => async (dispatch, getState) => {
  try {
    const nomor = getState().data.nomor;
    const response = await axios.get(
      `http://api.alquran.cloud/v1/ayah/${nomor}/ar.alafasy`
    );
    console.log("REDUX nomor", response.data.data);
    dispatch(setEditAyah(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
