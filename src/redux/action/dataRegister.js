import axios from "axios";
import { setData, setMessege } from "../reducer/reducerLogin";

export const responseRegister = (navigate) => async (dispatch, getstate) => {
  try {
    // const navigate = useNavigate();
    const email = getstate().login.editEmail;
    const password = getstate().login.editPassword;
    const name = getstate().login.editName;

    // const editEmail = getstate().register.editEmail;
    // const editName = getstate().register.editName;
    // const editPassword = getstate().register.editPassword;

    const response = await axios.post(
      `https://shy-cloud-3319.fly.dev/api/v1/auth/register`,
      {
        email: email,
        name: name,
        password: password,
        headers: { "content-type": "application/json" },
      }
    );

    console.log("cek response", response);
    dispatch(setData(response));
    if (response?.status === 201) {
      dispatch(setMessege("Register successful"));
      navigate("/login");
    } else {
      dispatch(
        setMessege(
          "Register failed. Please check your credentials. " +
            response.data.message
        )
      );
    }
  } catch (error) {
    console.log("cek alert", error);
    alert("blok goblok " + error.response.data.message);
    console.error("An error occurred:", error);
  }
};
