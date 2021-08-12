import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../../../ducks/store';
import {TokenService} from '../../../services';
import {QuizResult, User} from '../../../utils';

interface StateType {
  quizzes: QuizResult[] | null,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StateType = {
  quizzes: null,
  status: 'idle',
  error: null,
};

const getQuizzes = createAsyncThunk<
  QuizResult[],
  {},
  {
    state: RootState;
  }
>('quizResults/getAll', async (_foo, {getState, rejectWithValue}) => {
  const {accessToken} = getState().authReducer;
  const userId = accessToken
    ? TokenService.readToken(accessToken).id
    : undefined;

  if (!userId) {
    return rejectWithValue('Undefined user id');
  }

  return await axios
    .get(`http://localhost:8000/api/user/${userId}/quizScores/getAll`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      async (response) => {
        const quizData: QuizResult[] = response.data.quizData
        return quizData;
      },
      (error: AxiosError) => {
        return rejectWithValue(error);
      },
    );
});


const quizSlice = createSlice({
  name: 'quizData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizzes.pending, (state, _action) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(getQuizzes.fulfilled, (state, action) => {
      state.quizzes = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });

    builder.addCase(getQuizzes.rejected, (state, action) => {
      state.quizzes = null;
      state.error = action.error.message ?? 'Unknown login error';
      state.status = 'failed';
    });
  },
});

export default quizSlice.reducer;
export {getQuizzes};
