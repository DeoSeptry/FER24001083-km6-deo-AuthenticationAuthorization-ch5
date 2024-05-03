import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./komponen/navbar";
import { Icon } from "react-icons-kit";
import { eyeClosed } from "react-icons-kit/oct/eyeClosed";
import { eye } from "react-icons-kit/oct/eye";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { responseRegister } from "./redux/action/dataRegister";
import {
  clearLogin,
  setEmail,
  setName,
  setPassword,
} from "./redux/reducer/reducerLogin";

export default function Register() {
  const message = useSelector((state) => state.register.messege);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editEmail = useSelector((state) => state.register.editEmail);
  const editName = useSelector((state) => state.register.editName);
  const editPassword = useSelector((state) => state.register.editPassword);

  const cekState = useSelector((state) => state);
  console.log("cekState", cekState);
  const [icon, setIcon] = useState(eye);
  const [type, setType] = useState("password");

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
        <form className="flex flex-col w-[500px] bg-white/50 p-10 z-10 mt-10 rounded-lg justify-center">
          <div className="text-3xl font-bold justify-center flex pb-5">
            Register
          </div>
          <div className="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              value={editEmail}
              onChange={(e) => dispatch(setEmail(e?.target.value))}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => dispatch(setName(e?.target.value))}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-5 relative">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              onChange={(e) => dispatch(setPassword(e?.target?.value))}
            />
            <span onClick={(e) => lihatPassword(e?.target?.value)}>
              <Icon
                className="absolute end-2.5 bottom-2.5 cursor-pointer"
                icon={icon}
              />
            </span>
          </div>

          <button
            onClick={(e) => {
              e?.preventDefault();
              dispatch(responseRegister(navigate));
            }}
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
          <span class="block  text-black sm:text-center mt-5  ">
            Sudah punya akun?{" "}
            <a
              onClick={dispatch(clearLogin())}
              href="/login"
              class="hover:underline  text-blue-600 hover:text-blue-700"
            >
              Login disini.
            </a>
            {"   "}
          </span>
          <div className="flex flex-col items-center font-semibold pt-5">
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
