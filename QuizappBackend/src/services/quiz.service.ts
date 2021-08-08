import { QuizResult, User, Topic } from "@prisma/client";
import { db } from "../prisma";


const updateQuizScores = async (quizId: QuizResult["id"], status: QuizResult["status"], grade: QuizResult["grade"]) => {
  return await db.quizResult.update({
    where: { 
      id: quizId  
    },
    data: {
      status: status,
      grade: grade
    },
  })
}

const getQuizScoresByUserId = async (userId: User["id"]) => {
  return await db.user.findUnique({
    where: {
      id: userId,
    }, 
    include: {
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
  getQuizScoresByUserId,
  getQuizScoresByTopicId,
  getQuizScoresByQuizId
}