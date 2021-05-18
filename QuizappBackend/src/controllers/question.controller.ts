import { NextFunction, Request, Response } from "express";
import { QuestionService } from "../services";

const getQuestionsByTopicID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;

    const { trueFalseQuestions, multipleChoiceQuestions } =
      await QuestionService.getQuestionsByTopicID(Number(topicId));

    return res.json({
      message: "Succesfully fetched questions",
      trueFalseQuestions: trueFalseQuestions,
      multipleChoiceQuestions: multipleChoiceQuestions,
    });
  } catch (error) {
    return next(error);
  }
};

const createTrueFalseQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;
    const { question, questionImage, correctAnswer } = req.body;

    const updatedTopic = await QuestionService.createTrueFalseQuestion(
      Number(topicId),
      {
        question: question,
        questionImage: questionImage,
        correctAnswer: correctAnswer,
      }
    );

    return res.status(200).json({
      message: "Successfully created question",
      updatedTopic: updatedTopic,
    });
  } catch (error) {
    return next(error);
  }
};

const createMultipleChoiceQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;

    const {
      question,
      questionImage,
      correctAnswer,
      correctAnswerImage,
      wrongAnswer0,
      wrongAnswer0Image,
      wrongAnswer1,
      wrongAnswer1Image,
      wrongAnswer2,
      wrongAnswer2Image,
    } = req.body;

    const updatedTopic = await QuestionService.createMultipleChoiceQuestion(
      Number(topicId),
      {
        question: question,
        questionImage: questionImage,
        correctAnswer: correctAnswer,
        correctAnswerImage: correctAnswerImage,
        wrongAnswer0: wrongAnswer0,
        wrongAnswer0Image: wrongAnswer0Image,
        wrongAnswer1: wrongAnswer1,
        wrongAnswer1Image: wrongAnswer1Image,
        wrongAnswer2: wrongAnswer2,
        wrongAnswer2Image: wrongAnswer2Image,
      }
    );

    return res.status(200).json({
      message: "Successfully created question",
      updatedTopic: updatedTopic,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId, questionId } = req.params;
    const updatedUnit = await QuestionService.deleteQuestion(
      Number(topicId),
      Number(questionId)
    );

    return res.status(200).json({
      message: "Successfully deleted question",
      updatedUnit: updatedUnit,
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  getQuestionsByTopicID,
  createMultipleChoiceQuestion,
  createTrueFalseQuestion,
  deleteQuestion,
};
