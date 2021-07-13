import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../../ducks/store';

import {TokenService} from '../../services';
import {Language} from '../../utils';

interface StateType {
  score: number | null,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StateType = {
  score: null,
  status: 'idle',
  error: null,
};

const getLanguages = createAsyncThunk<
  Language[],
  {},
  {
    state: RootState;
  }
>('languages/getLanguages', async (_foo, {getState, rejectWithValue}) => {
  const {accessToken} = getState().authReducer;
  const userId = accessToken
    ? TokenService.readToken(accessToken).id
    : undefined;

  if (!userId) {
    return rejectWithValue('Undefined user id');
  }

  return await axios
    .get('http://localhost:8000/api/language', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      async (response) => {
        const languages: Language[] = response.data.languages;

        return languages;
      },
      (error: AxiosError) => {
        return rejectWithValue(error);
      },
    );
});

const unitsSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state, _action) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.languages = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });

    builder.addCase(getLanguages.rejected, (state, action) => {
      state.languages = null;
      state.error = action.error.message ?? 'Unknown login error';
      state.status = 'failed';
    });
  },
});

export default unitsSlice.reducer;
export {getLanguages};
