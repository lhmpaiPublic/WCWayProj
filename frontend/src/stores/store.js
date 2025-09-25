import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import sessionStorage from "redux-persist/lib/storage/session"; // sessionStorage
import authReducer from "./auth-slice";
import uiReducer from "./ui-slice";

// 타입 정의를 위한 루트 상태
const rootReducer = combineReducers({
  ui: persistReducer(
    {
      key: "ui",
      storage: storage,
    } ,
    uiReducer
  ),
  auth: persistReducer(
    {
      key: "auth",
      storage: sessionStorage,
    } ,
    authReducer
  ),
});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store, undefined, () => {
  console.log("Persisted state loaded");
});

export { store, persistor };
