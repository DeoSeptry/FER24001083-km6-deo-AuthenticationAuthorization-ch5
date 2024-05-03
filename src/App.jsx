import React, { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Quran from "./quran";
import QuranDetails from "./quranDetail";
import Ayat from "./ayat";
import Reminder from "./reminder";
import Login from "./login";
import Register from "./Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!useSelector((state) => state.login.token)
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Quran />,
    },
    {
      path: "/quran-details",
      element: <QuranDetails />,
    },

    {
      path: "/ayat",
      element: <Ayat />,
    },
    {
      path: "/reminder",
      element: <Reminder />,
    },
    {
      path: "/login",
      element: isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ),
    },
    {
      path: "/register",
      element: isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <Register setIsLoggedIn={setIsLoggedIn} />
      ),
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="997987783394-fie8ik56rg5il7ubfj51ks1r9t0d19ed.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
