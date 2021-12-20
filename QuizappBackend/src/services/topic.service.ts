import { Topic, Unit } from "@prisma/client";
import { db } from "../prisma";

const createTopic = async (
  unitId: Unit["id"],
  name: Topic["name"],
  number: Topic["number"],
  status: Topic["status"]
) => {
  return await db.unit.update({
    where: {
      id: unitId,
    },
    data: {
      topics: {
        create: {
          name: name,
          number: number,
          status: status
        },
      },
    },
    include: {
      topics: true,
    },
  });
};

const listTopicsByUnitID = async (unitId: Unit["id"]) => {
  return await db.topic.findMany({
    where: {
      unitId: unitId,
    },
    include:{
      unit: true,
      quizResults: true,
      multipleChoiceQuestions: true,
      trueFalseQuestions: true
    }
  });
};

const getTopicByID = async (topicId: Topic["id"]) => {
  return await db.topic.findUnique({
    where: { id: topicId },
    include: {
      multipleChoiceQuestions: true,
      trueFalseQuestions: true,
    },
  });
};

const deleteTopic = async (unitId: Unit["id"], topicId: Topic["id"]) => {
  // Disconnect and delete questions from topic
  const disconnectAndDeleteQuestions = db.topic.update({
    where: { id: Number(topicId) },
    data: {
      multipleChoiceQuestions: {
        deleteMany: {},
      },
      trueFalseQuestions: {
        deleteMany: {},
      },
    },
  });

  // Disconnect and delete topic from unit
  const disconnectAndDeleteTopic = db.unit.update({
    where: {
      id: Number(unitId),
    },
    data: {
      topics: {
        delete: { id: Number(topicId) },
      },
    },
  });

  // Delete topic using transaction to ensure everything succeeds or nothing is carried out
  const completed = await db.$transaction([
    disconnectAndDeleteQuestions,
    disconnectAndDeleteTopic,
  ]);

  return completed;
};

const updateTopicTitle = async (unitId: Unit["id"], topicId: Topic["id"], title: string) => {
  return await db.topic.updateMany({
    where: { 
      unitId: unitId,
      id: topicId
    },
    data: { 
      name: title
    },
  })
};

const updateTopicStatus = async (topicId: Topic["id"], status: Topic["status"]) => {
  return await db.topic.update({
    where: { 
      id: topicId
    },
    data: { 
      status: status
    },
  })
};

 export default {
  createTopic,
  listTopicsByUnitID,
  getTopicByID,
  deleteTopic,
  updateTopicTitle,
  updateTopicStatus
};
