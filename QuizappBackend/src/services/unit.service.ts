import { Topic, Unit } from ".prisma/client";
import { db } from "../prisma";

const createUnit = async (name: Unit["name"], number: Unit["number"]) => {
  return await db.unit.create({
    data: {
      name: name,
      number: number,
    },
  });
};

const getUnitByID = async (id: Unit["id"]) => {
  return await db.unit.findUnique({ where: { id: id } });
};

const listUnits = async () => {
  return await db.unit.findMany({
    include: {
      topics: {
        include: {
          multipleChoiceQuestions: true,
          trueFalseQuestions: true,
        },
      },
    },
  });
};

const updateUnit = async (updatedUnit: Unit) => {
  const unit = await db.unit.update({
    where: { id: updatedUnit.id },
    data: {
      ...updatedUnit,
    },
  });

  return unit;
};

const deleteUnit = async (id: Unit["id"]) => {
  // TODO add deleteQuestions
  const deleteTopics = db.topic.deleteMany({ where: { unitId: id } });
  const deleteUnit = db.unit.delete({
    where: { id: id },
    include: { topics: true },
  });

  return await db.$transaction([deleteTopics, deleteUnit]);
};

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

const deleteTopic = async(unitId: Unit["id"], topicId: Topic["id"]) => {
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
  createUnit,
  listUnits,
  getUnitByID,
  updateUnit,
  deleteUnit,
  createTopic,
  listTopicsByUnitID,
  getTopicByID,
  deleteTopic
};
