import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/reducer/reducerLogin";

function GoogleLogin({ buttonText }) {
  const cekState = useSelector((state) => state);
  console.log("cekState", cekState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerLoginWithGoogleAction = async (accessToken) => {
    console.log("token ", accessToken);
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;
      console.log("response.data ", response.data);
      dispatch(setToken(token));
      navigate("/", { state: { token: token } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };

  const token = useSelector((state) => state.login.token);
  console.log("token", token);
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
  });

  return (
    <>
      <button variant="primary" onClick={() => loginWithGoogle()}>
        {buttonText}
      </button>
    </>
  );
}

export default GoogleLogin;
