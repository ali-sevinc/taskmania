import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/uiSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
