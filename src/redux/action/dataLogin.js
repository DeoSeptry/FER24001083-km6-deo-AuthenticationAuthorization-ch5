import axios from "axios";
import { setData, setMessege, setToken } from "../reducer/reducerLogin";

export const responseLogin = (navigate) => async (dispatch, getstate) => {
  try {
    const email = getstate().login.editEmail;
    const password = getstate().login.editPassword;

    const response = await axios.post(
      `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("redux login", response);
    dispatch(setData(response.data?.data));
    // dispatch(setToken(response?.data?.data?.token));

    if (response.status === 200) {
      dispatch(setToken(response?.data?.data?.token));
      navigate("/", {
        state: { token: response.data?.data?.token },
      });
    } else {
      alert("password atau username salah");
    }
    dispatch(setMessege("Login successful"));
  } catch (error) {
    dispatch(setMessege("Login failed because " + error.response.data.message));
    alert(error.response.data.message);
    console.error("An error occurred:", error);
  }
};
