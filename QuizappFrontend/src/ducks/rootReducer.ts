import {combineReducers} from '@reduxjs/toolkit';

import userReducer from './authSlice';

const rootReducer = combineReducers({userReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
