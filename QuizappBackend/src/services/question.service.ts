import {
  MultipleChoiceQuestion,
  Topic,
  TrueFalseQuestion,
  Unit,
} from "@prisma/client";
import { db } from "../prisma";

const getQuestionsByTopicID = async (topicId: Topic["id"]) => {
  const trueFalseQuestions = await db.trueFalseQuestion.findMany({
    where: {
      topicId: Number(topicId),
    },
  });

  const multipleChoiceQuestions = await db.multipleChoiceQuestion.findMany({
    where: {
      topicId: Number(topicId),
    },
  });

  return {
    trueFalseQuestions: trueFalseQuestions,
    multipleChoiceQuestions: multipleChoiceQuestions,
  };
};

const createTrueFalseQuestion = async (
  unitId: Unit["id"],
  topicId: Topic["id"],
  question: Pick<TrueFalseQuestion, "question" | "correctAnswer"> &
    Partial<Pick<TrueFalseQuestion, "questionImage">>
) => {
  return await db.topic.update({
    where: {
      id: topicId,
    },
    data: {
      trueFalseQuestions: {
        create: {
          question: question.question,
          questionImage: question.questionImage,
          correctAnswer: question.correctAnswer,
        },
      },
    },
    include: {
      multipleChoiceQuestions: true,
      trueFalseQuestions: true,
    },
  });
};

const createMultipleChoiceQuestion = async (
  topicId: Topic["id"],
  question: Pick<
    MultipleChoiceQuestion,
    | "question"
    | "correctAnswer"
    | "wrongAnswer0"
    | "wrongAnswer1"
    | "wrongAnswer2"
  > &
    Partial<
      Pick<
        MultipleChoiceQuestion,
        | "questionImage"
        | "correctAnswerImage"
        | "wrongAnswer0Image"
        | "wrongAnswer1Image"
        | "wrongAnswer2Image"
      >
    >
) => {
  return await db.topic.update({
    where: {
      id: Number(topicId),
    },
    data: {
      multipleChoiceQuestions: {
        create: {
          question: question.question,
          correctAnswer: question.correctAnswer,
          wrongAnswer0: question.wrongAnswer0,
          wrongAnswer1: question.wrongAnswer1,
          wrongAnswer2: question.wrongAnswer2,
        },
      },
    },
    include: {
      multipleChoiceQuestions: true,
      trueFalseQuestions: true,
    },
  });
};

const editQuestion = async (
  question: TrueFalseQuestion | MultipleChoiceQuestion
) => {

  if (getQuestionType(question) === "MultipleChoice") {
    return await db.multipleChoiceQuestion.update({
      where: { id: question.id },
      data: { ...(question as MultipleChoiceQuestion) },
    });
  } else {
    return await db.trueFalseQuestion.update({
      where: { id: question.id },
      data: {
        ...(question as TrueFalseQuestion),
      },
    });
  }
};

const deleteQuestion = async (
  topicId: Topic["id"],
  questionId: MultipleChoiceQuestion["id"] | TrueFalseQuestion["id"]
) => {
  return await db.topic.update({
    where: {
      id: topicId,
    },
    data: {
      multipleChoiceQuestions: {
        delete: {
          id: questionId,
        },
      },
      trueFalseQuestions: {
        delete: {
          id: questionId,
        },
      },
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQuestionType = (question: any) => {
  return question.wrongAnswer0 === undefined ? "TrueFalse" : "MultipleChoice";
};

export default {
  getQuestionsByTopicID,
  createMultipleChoiceQuestion,
  createTrueFalseQuestion,
  editQuestion,
  deleteQuestion,
  getQuestionType
};
