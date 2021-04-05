import { NextFunction, Request, Response } from "express";
import { QuestionService } from "../services";

const getQuestionsByTopicID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;

    const {
      trueFalseQuestions,
      multipleChoiceQuestions,
    } = await QuestionService.getQuestionsByTopicID(Number(topicId));

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

    const newQuestion = await QuestionService.createTrueFalseQuestion(
      Number(topicId),
      {
        question: question,
        questionImage: questionImage,
        correctAnswer: correctAnswer,
      }
    );
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
  } catch (error) {
    return next(error);
  }
};

export default {
  getQuestionsByTopicID,
  createMultipleChoiceQuestion,
  createTrueFalseQuestion,
};
