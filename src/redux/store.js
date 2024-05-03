import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import dataReducer from "./reducer/dataReducer";
import reducerLogin from "./reducer/reducerLogin";
import Register from "../Register";
import reducerRegister from "./reducer/reducerRegister";

const rootReducers = combineReducers({
  data: dataReducer,
  login: reducerLogin,
  register: reducerRegister,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
