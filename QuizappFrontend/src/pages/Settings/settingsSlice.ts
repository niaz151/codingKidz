import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {Buffer} from 'buffer';

import axios, {AxiosError} from 'axios';
import {RootState} from '../../ducks/store';
import {Profile, User} from '../../utils/Models';
import {TokenService} from '../../services';

interface StateType {
  profile: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StateType = {
  profile: null,
  status: 'idle',
  error: null,
};

const getProfile = createAsyncThunk<
  {
    avatar: Buffer;
    userId: User['id'];
  },
  {},
  {
    state: RootState;
  }
>('settings/getProfile', async (_, {getState, rejectWithValue}) => {
  const {accessToken} = getState().authReducer;
  const userId = accessToken
    ? TokenService.readToken(accessToken).id
    : undefined;

  if (!userId) {
    return rejectWithValue('Undefined user id');
  }

  return await axios
    .get(`http://localhost:8000/api/user/${userId}/profile`, {
      headers: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    })
    .then(
      async (response) => {
        const profile: Profile = {
          avatar: Buffer.from(response.data.profile.profile.avatar.data),
          userId: response.data.profile.userId,
        };

        return profile;
      },
      (error: AxiosError) => {
        return rejectWithValue(error);
      },
    );
});

const uploadAvatar = createAsyncThunk<
  {
    avatar: Buffer;
  },
  {

  },
  {
    state: RootState;
  }
>(
  'settings/uploadAvatar',
  async (avatar: Buffer, {getState, rejectWithValue}) => {
    const {accessToken} = getState().authReducer;
    const userId = accessToken
      ? TokenService.readToken(accessToken).id
      : undefined;

    const data = new FormData();
    data.append(avatar);

    return await axios
      .post(
        `http://localhost:8000/api/user/${userId}/profile/avatar`,
        {
          avatar: avatar,
        },
        {
          headers: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        },
      )
      .then(
        async (response) => {
          return response.data.profile.profile;
        },
        (error: AxiosError) => {
          console.log('REJECTING LOGIN WITH ERROR', error);
          return rejectWithValue(error);
        },
      );
  },
);

const settingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state, _action) => {
      state.profile = null;
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.profile = null;
      state.error = action.error.message ?? null;
      state.status = 'failed';
    });
  },
});

export default settingsSlice.reducer;
export {
  getProfile,
  // uploadAvatar
};
