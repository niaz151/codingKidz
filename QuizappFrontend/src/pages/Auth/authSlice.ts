import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import axios, {AxiosError} from 'axios';
import {TokenService} from '../../services';
import {Roles} from '../../utils';

interface StateType {
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StateType = {
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

const login = createAsyncThunk(
  'user/login',
  async ({email, password}: {email: string; password: string}, thunkAPI) => {
    return await axios
      .post('http://localhost:8000/api/auth/login', {
        email: email,
        password: password,
      })
      .then(
        async (response) => {
          await TokenService.storeRefreshTokenInStorage(
            response.data.refreshToken,
          );

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

const register = createAsyncThunk<
  {accessToken: string; refreshToken: string},
  {email: string; password: string; role: Roles},
  {
    rejectValue: string;
  }
>(
  'user/register',
  async (
    {email, password, role}: {email: string; password: string; role: Roles},
    thunkAPI,
  ) => {
    return await axios
      .post('http://localhost:8000/api/auth/signup', {
        email: email,
        password: password,
        role: role,
      })
      .then(
        async (response) => {
          await TokenService.storeRefreshTokenInStorage(
            response.data.refreshToken,
          );

          return {
            accessToken: String(response.data.accessToken),
            refreshToken: String(response.data.refreshToken),
          };
        },
        (error) => {
          // Request was made and server responded with a non 200 status code
          if (error.response) {
            switch (error.response.status) {
              case 409:
                return thunkAPI.rejectWithValue(error.response.data.message);
              default:
                return thunkAPI.rejectWithValue('Error occured during signup');
            }
            // Request was made but no response was received
          } else if (error.request) {
            return thunkAPI.rejectWithValue('No response received');
            // Other error
          } else {
            return thunkAPI.rejectWithValue(String(error));
          }
        },
      );
  },
);

const refreshTokens = createAsyncThunk(
  'user/refreshTokens',
  async (refreshToken: string, _thunkAPI) => {
    return await axios
      .get('http://localhost:8000/api/auth/refreshToken', {
        headers: {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      })
      .then((response) => {
        TokenService.storeRefreshTokenInStorage(response.data.refreshToken);

        return {
          accessToken: String(response.data.accessToken),
          refreshToken: String(response.data.refreshToken),
        };
      });
  },
);

const logout = createAsyncThunk('user/logout', async ({}, _thunkAPI) => {
  return await TokenService.removeRefreshTokenFromStorage();
});

const restoreRefreshToken = createAsyncThunk(
  'user/restoreToken',
  async ({}, thunkAPI) => {
    const storedToken = await TokenService.getRefreshTokenFromStorage();
    if (storedToken) {
      return storedToken;
    } else {
      return thunkAPI.rejectWithValue('No token stored');
    }
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

    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
      state.status = 'succeeded';
    });

    builder.addCase(login.rejected, (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = action.error.message ?? 'Unknown login error';
      state.status = 'failed';
    });

    builder.addCase(register.pending, (state, _action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(logout.fulfilled, (state, _action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.status = 'succeeded';
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = action.error.message ?? 'Unknown registration error';
      state.status = 'failed';
    });

    builder.addCase(logout.pending, (state, _action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
      state.status = 'succeeded';
    });

    builder.addCase(register.rejected, (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = action.error.message ?? 'Unknown registration error';
      state.status = 'failed';
    });

    builder.addCase(refreshTokens.pending, (state, _action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
      state.status = 'succeeded';
    });

    builder.addCase(refreshTokens.rejected, (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = action.error.message ?? 'Unknown registration error';
      state.status = 'failed';
    });

    builder.addCase(restoreRefreshToken.pending, (state, _action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(restoreRefreshToken.fulfilled, (state, action) => {
      state.accessToken = null;
      state.refreshToken = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });

    builder.addCase(restoreRefreshToken.rejected, (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = action.error.message ?? 'Unknown registration error';
      state.status = 'failed';
    });
  },
});

export const {setRefreshToken} = userSlice.actions;
export default userSlice.reducer;
export {login, register, refreshTokens, logout, restoreRefreshToken};
