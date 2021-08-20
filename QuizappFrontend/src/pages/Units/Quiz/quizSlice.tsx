import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {RootState} from '../../../ducks/store';
import {TokenService} from '../../../services';
import {QuizResult, User} from '../../../utils';
import { QuizResultStatus } from '../../../utils/Models';

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

const convertToString = (status: QuizResultStatus) => {
  if (status ===  QuizResultStatus.COMPLETED){
    return 'COMPLETED';
  }
  if (status === QuizResultStatus.PENDING){
    return 'PENDING';
  }
  if (status === QuizResultStatus.LOCKED){
    return 'LOCKED';
  }
}



const udpateQuizData = createAsyncThunk(
  'quizzes/updateQuiz',
  async ({user_id, topic_id, quiz_id, grade, status}: {user_id: number; topic_id: number; quiz_id:number; grade: number, status: QuizResultStatus}, thunkAPI) => {
    var string_status = convertToString(status);
    console.log(`http://localhost:8000/api/user/${user_id}/quizScores/topic/${topic_id}/update/quiz/${quiz_id}/${grade}/${string_status}`)
    return await axios
      .post(`http://localhost:8000/api/user/${user_id}/quizScores/topic/${topic_id}/update/quiz/${quiz_id}/${grade}/${string_status}`, {
        user_id: user_id,
        topic_id: topic_id,
        quiz_id: quiz_id,
        grade: grade,
        status: string_status
      })
      .then(
        async (response) => {
          await TokenService.storeRefreshTokenInStorage(
            response.data.refreshToken,
          );
          return {
            data: String(response.data),
          };
        },             
        (error: AxiosError) => {
          console.log('REJECTING UPDATE QUIZ', error);
          // TODO: THE BELOW LINE CREATES A NON-SERIALIZABLE ERROR
          return thunkAPI.rejectWithValue(error);
        },
      );
  },
);



const quizSlice = createSlice({
  name: 'quizData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizzes.pending, (state, _action) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(udpateQuizData.pending, (state, _action) => {
      state.error = null;
      state.status = 'loading';
    })

    builder.addCase(getQuizzes.fulfilled, (state, action) => {
      state.quizzes = action.payload;
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(udpateQuizData.fulfilled, (state, _action) => {
      state.error = null;
      state.status = 'succeeded';
    })

    builder.addCase(getQuizzes.rejected, (state, action) => {
      state.quizzes = null;
      state.error = action.error.message ?? 'Unknown login error';
      state.status = 'failed';
    });
    builder.addCase(udpateQuizData.rejected, (state, _action) => {
      state.error = null;
      state.status = 'failed';
    })
  },
});

export default quizSlice.reducer;
export {getQuizzes, udpateQuizData};
