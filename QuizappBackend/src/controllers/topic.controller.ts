import { NextFunction, Request, Response } from "express";
import { TopicService, QuizService } from "../services";

const createTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, number } = req.body;
    const { unitId } = req.params;

    const newTopic = await TopicService.createTopic(
      Number(unitId),
      name,
      number
    );

    return res.status(201).json({
      message: "Created topic",
      topic: newTopic,
    });
  } catch (error) {
    return next(error);
  }
};

const listTopicsByUnitID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { unitId } = req.params;
    const data = await TopicService.listTopicsByUnitID(Number(unitId));
    return res.status(200).json({
      message: "Fetched profile",
      topics: data
    });
  } catch (error) {
    return next(error);
  }
};

const getTopicByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;

    const topic = await TopicService.getTopicByID(Number(topicId));

    return res.status(200).json({
      topic: topic,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { unitId, topicId } = req.params;
    const deleteTopic = await TopicService.deleteTopic(
      Number(unitId),
      Number(topicId)
    );

    return res.status(200).json({
      message: "Deleted topic",
      deletedTopic: deleteTopic,
    });
  } catch (error) {
    return next(error);
  }
};

const getQuizResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topicId } = req.params;
    const quizData = await QuizService.getQuizScoresByTopicId(Number(topicId));

    return res.status(200).json({
      message: "Fetched Quiz Scores Via Topic Id",
      quizData: quizData?.quizResults
    });

  } catch (error) {
    return next(error);
  }
};


const updateTopicTitle = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { unitId, topicId, title } = req.params;
    const topicData = await TopicService.updateTopicTitle(Number(unitId), Number(topicId), title);
    return res.status(200).json({
      message: "Updated Topic Title",
      topicData: topicData
    })
  } catch (error) {
    return next(error);
  }
}

const getTopicStatuses = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { unitId } = req.params;
    const topicData = await TopicService.getTopicStatuses(Number(unitId));
    return res.status(200).json({
      message: "Received All Topic Statuses For Unit",
      topicData: topicData
    })
  } catch (error) {
    return next(error);
  }
}



export default { listTopicsByUnitID, createTopic, getTopicByID, deleteTopic, getQuizResults, updateTopicTitle, getTopicStatuses };
