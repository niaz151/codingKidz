import { NextFunction, Request, Response } from "express";
import { QuizService } from "../services";

const getQuizScores = async (req:Request, res: Response, next: NextFunction) => {
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
  if (status === "passed"){
    return "PASSED";
  }
  if (status === "failed"){
    return "FAILED";
  }
  if (status === "pending"){
    return "PENDING";
  }
  else{
    return "FAILED"
  }
}

const updateQuizScores = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { quizId, status } = req.params;
    const typedStatus = convertToEnum(status)
    const quizData = await QuizService.updateQuizScores(Number(quizId), typedStatus)
    
    return res.status(200).json({
      message: "Updated Quiz Scores",
      quizData: quizData  
    })
  } catch (error) {
    return next(error);
  }
}

export default { getQuizScores, updateQuizScores };