import {configureStore, Action} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ThunkAction} from 'redux-thunk';

import {combineReducers} from '@reduxjs/toolkit';

import userReducer from '../pages/Auth/authSlice';

const rootReducer = combineReducers({userReducer});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  // TODO Fix middleware typing bug preventing proper dispatches
  // middleware: (getDefaultMiddleware) => {
  //   return [...getDefaultMiddleware(), require('redux-flipper').default];
  // },
});

type AppDispatch = typeof store.dispatch;
type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
