import { Language, Unit} from "@prisma/client";
import { db } from "../prisma";

const createUnit = async (
  languageId: Language["id"],
  name: Unit["name"],
  number: Unit["number"],
  status: Unit["status"],
) => {
  return await db.language.update({
    where: { id: languageId },
    data: {
      units: {
        create: {
          name: name,
          number: number,
          status: status,
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

const updateUnitTitle = async (languageId: Language["id"], unitId: Unit["id"], title: string) => {
  return await db.unit.updateMany({
    where: { 
      languageId: languageId,
      id: unitId,
    },
    data: { 
      name: title
    },
  })
};

const updateUnitStatus = async (languageId: Language["id"], unitId: Unit["id"], status: Unit["status"]) => {
  return await db.unit.updateMany({
    where: { 
      languageId: languageId,
      id: unitId,
    },
    data: { 
      status: status
    },
  })
};

const initFirstUnit = async (languageId: Language["id"]) => {
  const status: Unit["status"] = "PENDING";
  const calculated_id = ((languageId - 1) * 4) + 1;
  return await db.unit.updateMany({
    where: { 
      languageId: languageId,
      id: calculated_id,
    },
    data: { 
      status: status
    },
  })
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
  updateUnitTitle,
  updateUnitStatus,
  initFirstUnit
};
