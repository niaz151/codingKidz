import { Topic, Unit } from "@prisma/client";
import { db } from "../prisma";

const createTopic = async (
  unitId: Unit["id"],
  name: Topic["name"],
  number: Topic["number"]
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

 export default {
  createTopic,
  listTopicsByUnitID,
  getTopicByID,
  deleteTopic,
};
