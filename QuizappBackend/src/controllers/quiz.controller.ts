import { NextFunction, Request, Response } from "express";
import { QuizService } from "../services";


const getQuizScoresByTopicId = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { topicId } = req.params;

    const quizData = await QuizService.getQuizScoresByTopicId(Number(topicId));

    return res.status(200).json({
      message: "Fetched Quiz Scores Via Topic Id",
      quizData: quizData?.quizResults
    })
  } catch (error) {
    return next(error);
  }
}

const getQuizScoresByUserId = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const quizData = await QuizService.getQuizScoresByUserId(Number(userId));
    return res.status(200).json({
      message: "Fetched Quiz Scores Via User Id",
      quizData: quizData?.quizResults
    })
  } catch (error) {
    return next(error);
  }
}

const convertToEnum = (status:string) => {
  if (status === 'COMPLETED'){
    return "COMPLETED";
  }
  if (status === 'PENDING'){
    return "PENDING";
  }
  if (status === 'LOCKED'){
    return "LOCKED";
  }
  else{
    return "LOCKED"
  }
}

const updateQuizScores = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { userId, topicId, quizId, grade, status } = req.params;
    const typedStatus = convertToEnum(status)
    const quizData = await QuizService.updateQuizScores(Number(userId), Number(topicId), Number(quizId), typedStatus, Number(grade))
    
    return res.status(200).json({
      message: "Updated Quiz Scores",
      quizData: quizData  
    })
  } catch (error) {
    return next(error);
  }
}

export default { getQuizScoresByUserId, getQuizScoresByTopicId, updateQuizScores };