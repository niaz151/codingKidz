import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../pages/auth/authSlice";
import languagesReducer from '../pages/units/languagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    languages: languagesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
