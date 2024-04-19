import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeClosed } from "react-icons-kit/oct/eyeClosed";
import { eye } from "react-icons-kit/oct/eye";
import Navbar from "./komponen/navbar";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [editEmail, setEmail] = useState("");
  const [editPassword, setPassword] = useState("");
  const [items, setItems] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
        {
          email: editEmail,
          password: editPassword,
        }
      );

      setData(response.data?.data);
      if (response.status === 200) {
        localStorage.setItem("login", "login");
        localStorage.setItem("token", response.data?.data?.token);
        navigate("/", {
          state: { token: response.data?.data?.token },
        });
      } else {
        alert("password atau username salah");
      }
      setMessage("Login successful");
    } catch (error) {
      setMessage("Login failed because " + error.response.data.message);
      console.error("An error occurred:", error);
    }
  };

  const lihatPassword = (e) => {
    if (type === "password") {
      setIcon(eyeClosed);
      setType("text");
    } else {
      setIcon(eye);
      setType("password");
    }
  };
  useEffect(() => {
    const items = localStorage.getItem("token");
    if (items) {
      setItems(items);
    }
  }, [items]);
  console.log("token", items);
  console.log("email", editEmail);
  console.log("cek data", data);
  return (
    <div className="bg-[#0C121F]">
      <Navbar />
      <div className="relative flex justify-center items-center">
        <img
          src="images/bg.png"
          className="w-full h-100vh object-cover absolute inset-0 z-0  "
          alt="Background"
        />

        <form className="flex flex-col w-[500px] bg-white/50 p-10 z-10 mt-10 rounded-lg justify-center items-center">
          <div className="text-3xl font-bold justify-center flex pb-5">
            Login
          </div>
          <div class="mb-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-96"
            >
              Email
            </label>
            <input
              value={editEmail}
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e?.target?.value)}
            />
          </div>
          <div class="mb-5 relative">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-96"
            >
              Password
            </label>
            <input
              value={editPassword}
              type={type}
              id="password"
              placeholder="Password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              onChange={(e) => setPassword(e?.target?.value)}
            />

            <span onClick={(e) => lihatPassword(e?.target?.value)}>
              <Icon
                className="absolute end-2.5 bottom-2.5 cursor-pointer"
                icon={icon}
              />
            </span>
          </div>

          <button
            type="submit"
            onClick={(e) => {
              e?.preventDefault();
              login(e?.target.value);
            }}
            class="text-white w-96  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
            className=" flex mt-5 border-2 font-semibold items-center justify-center text-center w-96 text-sm border-gray-300 rounded-lg p-2 bg-white text-black hover:bg-gray-300 hover:text-black font-xl"
          >
            <div className="mr-5">
              <FaGoogle size={20} />
            </div>
            <GoogleLogin buttonText="Login with Google" />
          </div>
          <span class="block  text-black sm:text-center mt-5  ">
            Belum punya akun?{" "}
            <a
              href="/register"
              class="hover:underline  text-blue-600 hover:text-blue-700"
            >
              Register disini.
            </a>
            {"   "}
          </span>
          <div className="flex flex-col items-center  pt-5">
            {message && (
              <p
                className={`text-md ${
                  message.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
