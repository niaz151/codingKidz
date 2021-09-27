import { QuizResult, User, Topic } from "@prisma/client";
import { db } from "../prisma";


const updateQuizScores = async (userId:QuizResult["userId"], topicId:QuizResult["topicId"], quizId: QuizResult["id"], status: QuizResult["status"], grade: QuizResult["grade"]) => {
  return await db.quizResult.updateMany({
    where: { 
      id: quizId,
      userId: userId,
      topicId: topicId
    },
    data: { 
      status: status,
      grade: grade
    },
  })
}


const updateQuizStatus = async (userId:QuizResult["userId"], topicId:QuizResult["topicId"], quizId: QuizResult["id"], status: QuizResult["status"]) => {
  return await db.quizResult.updateMany({
    where: { 
      id: quizId,
      userId: userId,
      topicId: topicId
    },
    data: { 
      status: status,
    },
  })
}


const getQuizScoresByUserId = async (userId: User["id"]) => {
  return await db.user.findUnique({
    where: {
      id: userId,
    }, 
    include: {
      // doesn't return all quiz results
      quizResults: true,
    }
  })
}

const getQuizScoresByTopicId = async (topicId: Topic["id"]) => {
  return await db.topic.findUnique({
    where: {
      id: topicId,
    }, 
    include: {
      quizResults: true,
    }
  })
}

const getQuizScoresByQuizId = async (quizId: QuizResult["id"]) => {
  return await db.quizResult.findUnique({
    where: {
      id: quizId,
    }
  })
}

export default {
  updateQuizScores,
  updateQuizStatus,
  getQuizScoresByUserId,
  getQuizScoresByTopicId,
  getQuizScoresByQuizId,
}