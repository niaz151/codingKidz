import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../../ducks/store';
import {TokenService} from '../../services';
import {Language, Unit} from '../../utils';

interface StateType {
  units: Unit[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StateType = {
  units: null,
  status: 'idle',
  error: null,
};

const getUnits = createAsyncThunk<
  Unit[],
  {},
  {
    state: RootState;
  }
>('units/getUnits', async (_foo, {getState, rejectWithValue}) => {
  const {accessToken} = getState().authReducer;
  const userId = accessToken
    ? TokenService.readToken(accessToken).id
    : undefined;

  if (!userId) {
    return rejectWithValue('Undefined user id');
  }

  // change the endpoint here
  return await axios
    .get('http://localhost:8000/api/language', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      async (response) => {
        const units: Unit[] = response.data.languages;

        return units;
      },
      (error: AxiosError) => {
        return rejectWithValue(error);
      },
    );
});

const unitSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUnits.pending, (state, _action) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(getUnits.fulfilled, (state, action) => {
      state.units = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });

    builder.addCase(getUnits.rejected, (state, action) => {
      state.units = null;
      state.error = action.error.message ?? 'Unknown login error';
      state.status = 'failed';
    });
  },
});

export default unitSlice.reducer;
export {getUnits };
