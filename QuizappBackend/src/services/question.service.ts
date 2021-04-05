import {
  MultipleChoiceQuestion,
  Topic,
  TrueFalseQuestion
} from ".prisma/client";
import { nextTick } from "node:process";
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
  topicId: Topic["id"],
  question: TrueFalseQuestion
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
  });
};

const createMultipleChoiceQuestion = async (
  topicId: Topic["id"],
  question: MultipleChoiceQuestion
) => {
  const updatedTopic = await db.topic.update({
    where: {
      id: Number(topicId),
    },
    data: {
      multipleChoiceQuestions: {
        create: {
          question: question,
          ...(question.questionImage && {
            questionImage: question.questionImage,
          }),
          correctAnswer: question.correctAnswer,
          ...(question.correctAnswerImage && {
            correctAnswerImage: question.correctAnswerImage,
          }),
          wrongAnswer0: question.wrongAnswer0,
          ...(question.wrongAnswer0Image && {
            wrongAnswer0Image: question.wrongAnswer0Image,
          }),
          wrongAnswer1: question.wrongAnswer1,
          ...(question.wrongAnswer1Image && {
            wrongAnswer1Image: question.wrongAnswer1Image,
          }),
          wrongAnswer2: question.wrongAnswer2,
          ...(question.wrongAnswer2Image && {
            wrongAnswer2Image: question.wrongAnswer2Image,
          }),
        },
      },
    },
    include: {
      multipleChoiceQuestions: true,
    },
  });
};

export default {
  getQuestionsByTopicID,
  createMultipleChoiceQuestion,
  createTrueFalseQuestion,
};
