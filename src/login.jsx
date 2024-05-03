import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeClosed } from "react-icons-kit/oct/eyeClosed";
import { eye } from "react-icons-kit/oct/eye";
import Navbar from "./komponen/navbar";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { responseLogin } from "./redux/action/dataLogin";
import {
  clearRegister,
  logout,
  setEmail,
  setPassword,
} from "./redux/reducer/reducerLogin";

export default function Login() {
  const message = useSelector((state) => state.register.messege);
  const navigate = useNavigate();
  const cekState = useSelector((state) => state);
  const token = useSelector((state) => state.login.token);
  const email = useSelector((state) => state.login.editEmail);
  const password = useSelector((state) => state.login.editPassword);
  console.log("cek state", cekState);
  console.log("token", token);

  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);

  const lihatPassword = (e) => {
    if (type === "password") {
      setIcon(eyeClosed);
      setType("text");
    } else {
      setIcon(eye);
      setType("password");
    }
  };

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
              value={email}
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Email"
              required
              onChange={(e) => {
                dispatch(setEmail(e?.target?.value));
              }}
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
              value={password}
              type={type}
              id="password"
              placeholder="Password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              onChange={(e) => {
                dispatch(setPassword(e?.target?.value));
              }}
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
              dispatch(responseLogin(navigate));
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
              onClick={() => dispatch(clearRegister())}
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
