import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../ducks/store";
import { TokenService } from "../../services";
import {
  Unit,
  Topic,
  MultipleChoiceQuestion,
  Language,
  TrueFalseQuestion,
} from "../../utils/models";

interface StateType {
  languages: Language[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StateType = {
  languages: null,
  status: "idle",
  error: null,
};

const getLanguages = createAsyncThunk<
  Language[],
  {},
  {
    state: RootState;
  }
>("languages/getLanguages", async (_foo, { getState, rejectWithValue }) => {
  const { accessToken } = getState().auth;
  const userId = accessToken
    ? TokenService.readToken(accessToken).id
    : undefined;

  if (!userId) {
    return rejectWithValue("Undefined user id");
  }

  return await axios
    .get("http://localhost:8000/api/language", {
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
      }
    );
});

const createMultipleChoiceQuestion = createAsyncThunk<
  Topic,
  {
    languageId: Language["id"];
    unitId: Unit["id"];
    topicId: Topic["id"];
    question: Pick<
      MultipleChoiceQuestion,
      | "question"
      | "correctAnswer"
      | "wrongAnswer0"
      | "wrongAnswer1"
      | "wrongAnswer2"
    >;
  },
  {
    state: RootState;
  }
>(
  "units/createMultipleChoiceQuestion",
  async (
    { languageId, unitId, topicId, question },
    { getState, rejectWithValue }
  ) => {
    const { accessToken } = getState().auth;
    const userId = accessToken
      ? TokenService.readToken(accessToken).id
      : undefined;

    if (!userId) {
      return rejectWithValue("Undefined user id");
    }

    return await axios
      .post(
        `http://localhost:8000/api/language/${languageId}/unit/${unitId}/topic/${topicId}/question/multiplechoice`,
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

const createTrueFalseQuestion = createAsyncThunk<
  Topic,
  {
    languageId: Language["id"];
    unitId: Unit["id"];
    topicId: Topic["id"];
    question: Pick<TrueFalseQuestion, "question" | "correctAnswer">;
  },
  {
    state: RootState;
  }
>(
  "units/createTrueFalseQuestion",
  async (
    { languageId, unitId, topicId, question },
    { getState, rejectWithValue }
  ) => {
    const { accessToken } = getState().auth;
    const userId = accessToken
      ? TokenService.readToken(accessToken).id
      : undefined;

    if (!userId) {
      return rejectWithValue("Undefined user id");
    }

    return await axios
      .post(
        `http://localhost:8000/api/language/${languageId}/unit/${unitId}/topic/${topicId}/question/truefalse`,
        {
          question: question.question,
          correctAnswer: question.correctAnswer,
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

const editQuestion = createAsyncThunk<
  Topic,
  {
    languageId: Language["id"];
    unitId: Unit["id"];
    topicId: Topic["id"];
    question: TrueFalseQuestion | MultipleChoiceQuestion;
  },
  {
    state: RootState;
  }
>(
  "units/editQuestion",
  async (
    { languageId, unitId, topicId, question },
    { getState, rejectWithValue }
  ) => {
    const { accessToken } = getState().auth;
    const userId = accessToken
      ? TokenService.readToken(accessToken).id
      : undefined;

    if (!userId) {
      return rejectWithValue("Undefined user id");
    }

    return await axios
      .post(
        `http://localhost:8000/api/language/${languageId}/unit/${unitId}/topic/${topicId}/question/${question.id}`,
        {
          ...question,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        async (response) => {
          const updatedQuestion = response.data.updatedQuestion;

          return updatedQuestion;
        },
        (error: AxiosError) => {
          return rejectWithValue(error);
        }
      );
  }
);



const deleteQuestion = createAsyncThunk<
  Topic,
  {
    languageId: Language["id"];
    unitId: Unit["id"];
    topicId: Topic["id"];
    questionId: TrueFalseQuestion["id"] | MultipleChoiceQuestion["id"];
  },
  {
    state: RootState;
  }
>(
  "units/deleteQuestion",
  async (
    { languageId, unitId, topicId, questionId },
    { getState, rejectWithValue }
  ) => {
    const { accessToken } = getState().auth;
    const userId = accessToken
      ? TokenService.readToken(accessToken).id
      : undefined;

    if (!userId) {
      return rejectWithValue("Undefined user id");
    }

    return await axios
      .delete(
        `http://localhost:8000/api/language/${languageId}/unit/${unitId}/topic/${topicId}/question/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        async (response) => {
          const updatedQuestion = response.data.updatedQuestion;

          return updatedQuestion;
        },
        (error: AxiosError) => {
          return rejectWithValue(error);
        }
      );
  }
);

const editUnit = createAsyncThunk<
  Unit,
  {
    languageId: Language["id"];
    unitId: Unit["id"];
    title: String,
  },
  {
    state: RootState;
  }
>(
  "units/editUnit",
  async (
    { languageId, unitId, title },
    { getState, rejectWithValue }
  ) => {
    const { accessToken } = getState().auth;
    const userId = accessToken
      ? TokenService.readToken(accessToken).id
      : undefined;

    if (!userId) {
      return rejectWithValue("Undefined user id");
    }

    return await axios
      .post(
        `http://localhost:8000/api/language/${languageId}/unit/${unitId}/updateTitle/${title}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        async (response) => {
          const updatedUnit = response.data.updatedUnit;
          return updatedUnit;
        },
        (error: AxiosError) => {
          return rejectWithValue(error);
        }
      );
  }
);

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.languages = action.payload;
      state.error = null;
      state.status = "succeeded";
    });

    builder.addCase(getLanguages.rejected, (state, action) => {
      state.languages = null;
      state.error = action.error.message ?? "Unknown language get error";
      state.status = "failed";
    });

    builder.addCase(createMultipleChoiceQuestion.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(createMultipleChoiceQuestion.fulfilled, (state, action) => {
      state.error = null;
      // trigger refresh of questions
      state.status = "idle";
    });

    builder.addCase(createMultipleChoiceQuestion.rejected, (state, action) => {
      state.error =
        action.error.message ?? "Unknown multiple choice creation error";
      state.status = "failed";
    });

    builder.addCase(createTrueFalseQuestion.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(createTrueFalseQuestion.fulfilled, (state, action) => {
      state.error = null;
      // trigger refresh of questions
      state.status = "idle";
    });

    builder.addCase(createTrueFalseQuestion.rejected, (state, action) => {
      state.error = action.error.message ?? "Unknown true false creation error";
      state.status = "failed";
    });

    builder.addCase(editQuestion.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(editQuestion.fulfilled, (state, action) => {
      state.error = null;
      // trigger refresh of questions
      state.status = "idle";
    });

    builder.addCase(editQuestion.rejected, (state, action) => {
      state.error = action.error.message ?? "Unknown edit question error";
      state.status = "failed";
    });

    builder.addCase(deleteQuestion.pending, (state, _action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.error = null;
      // trigger refresh of questions
      state.status = "idle";
    });

    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.error =
        action.error.message ?? "Unknown question deletion error";
      state.status = "failed";
    });

    builder.addCase(editUnit.pending, (state, action) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(editUnit.fulfilled, (state, action) => {
      state.error = null;
      state.status = "idle";
    });

    builder.addCase(editUnit.rejected, (state, action) => {
      state.error =
        action.error.message ?? "Unknown unit edit error";
      state.status = "failed";
    });
  },
});

export default languagesSlice.reducer;
export {
  getLanguages,
  createMultipleChoiceQuestion,
  createTrueFalseQuestion,
  editQuestion,
  deleteQuestion,
  editUnit
};
