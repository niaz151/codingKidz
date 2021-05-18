import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../ducks/store";
import { TokenService } from "../../services";
import { Unit, Topic, MultipleChoiceQuestion } from "../../utils/models";

interface StateType {
  units: Unit[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StateType = {
  units: null,
  status: "idle",
  error: null,
};

const getUnits = createAsyncThunk<
  Unit[],
  {},
  {
    state: RootState;
  }
>("units/getProfile", async (_foo, { getState, rejectWithValue }) => {
  const { accessToken } = getState().auth;
  const userId = accessToken
    ? TokenService.readToken(accessToken).id
    : undefined;

  if (!userId) {
    return rejectWithValue("Undefined user id");
  }

  return await axios
    .get("http://localhost/api/unit", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      async (response) => {
        const units: Unit[] = response.data.units;

        return units;
      },
      (error: AxiosError) => {
        return rejectWithValue(error);
      }
    );
});

const createMultipleChoiceQuestion = createAsyncThunk<
  Topic,
  {
    unitId: Unit["id"];
    topicId: Topic["id"];
    question: MultipleChoiceQuestion;
  },
  {
    state: RootState;
  }
>(
  "units/createMultipleChoiceQuestion",
  async ({ unitId, topicId, question }, { getState, rejectWithValue }) => {
    const { accessToken } = getState().auth;
    const userId = accessToken
      ? TokenService.readToken(accessToken).id
      : undefined;

    if (!userId) {
      return rejectWithValue("Undefined user id");
    }

    return await axios
      .post(
        `http://localhost/api/unit/${unitId}/topic/${topicId}/question/multiplechoice`,
        {
          question: question.question,
          correctAnswer: question.correctAnswer,
          wrongAnswer0: question.wrongAnswer0,
          wrongAnswer1: question.wrongAnswer1,
          wrongAnswer2: question.wrongAnswer2,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        async (response) => {
          const updatedTopic = response.data.updatedTopic;

          return updatedTopic;
        },
        (error: AxiosError) => {
          return rejectWithValue(error);
        }
      );
  }
);

const unitsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUnits.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(getUnits.fulfilled, (state, action) => {
      state.units = action.payload;
      state.error = null;
      state.status = "succeeded";
    });

    builder.addCase(getUnits.rejected, (state, action) => {
      state.units = null;
      state.error = action.error.message ?? "Unknown login error";
      state.status = "failed";
    });

    builder.addCase(createMultipleChoiceQuestion.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    })

    builder.addCase(createMultipleChoiceQuestion.fulfilled, (state, action) => {
      state.units.topics = {...state.units.topics.filter(topic => topic.id !== action.payload.id), action.payload};
      state.error = null;
      state.status = "succeeded";
    })
  },
});

export default unitsSlice.reducer;
export { getUnits };
