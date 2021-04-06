import { Topic, Unit } from "@prisma/client";
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

export default {
  createUnit,
  listUnits,
  getUnitByID,
  updateUnit,
  deleteUnit,
};
