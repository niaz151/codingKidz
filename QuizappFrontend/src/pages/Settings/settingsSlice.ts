import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import axios, {AxiosError} from 'axios';

interface StateType {
  profile: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StateType = {
  profile: null,
  status: 'idle',
  error: null,
};

const getProfile = createAsyncThunk(
  'settings/getProfile',
  async ({userId, avatar}: {userId: string; avatar: Buffer}, thunkAPI) => {
    const formData = new FormData();

    formData.append(avatar, {

    })
    return await axios
      .post(`http://localhost:8000/api/user/${userId}/avatar`, {
        avatar: avatar,
      })
      .then(
        async (response) => {
          

          return {
            accessToken: String(response.data.accessToken),
            refreshToken: String(response.data.refreshToken),
          };
        },
        (error: AxiosError) => {
          console.log('REJECTING LOGIN WITH ERROR', error);
          return thunkAPI.rejectWithValue(error);
        },
      );
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, _action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.status = 'loading';
    });
  },
});

export const {setRefreshToken} = userSlice.actions;
export default userSlice.reducer;
export {login, register, refreshTokens, logout, restoreRefreshToken};
