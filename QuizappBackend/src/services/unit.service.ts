import { Language, Unit } from "@prisma/client";
import { db } from "../prisma";

const createUnit = async (
  languageId: Language["id"],
  name: Unit["name"],
  number: Unit["number"]
) => {
  return await db.language.update({
    where: { id: languageId },
    data: {
      units: {
        create: {
          name: name,
          number: number,
        },
      },
    },
  });
};

const getUnitByID = async (id: Unit["id"]) => {
  return await db.unit.findUnique({ where: { id: id } });
};

const listUnits = async (languageId: Language["id"]) => {
  return await db.unit.findMany({
    where: { languageId: languageId },
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
  return await db.unit.update({
    where: { id: updatedUnit.id },
    data: {
      ...updatedUnit,
    },
  });
};

const deleteUnit = async (languageId: Language["id"], unitId: Unit["id"]) => {
  // TODO add deleteQuestions
  const deleteTopics = db.topic.deleteMany({ where: { unitId: unitId } });
  const deleteUnit = db.unit.delete({
    where: { id: unitId },
    include: { topics: true },
  });
  const deleteUnitFromLanguage = db.language.update({
    where: { id: languageId },
    data: {
      units: {
        deleteMany: {},
      },
    },
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
