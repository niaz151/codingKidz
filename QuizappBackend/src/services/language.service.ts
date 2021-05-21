import { Language } from "@prisma/client";
import { db } from "../prisma";

const createLanguage = async (name: Language["name"]) => {
  return await db.language.create({
    data: {
      name: name,
    },
  });
};

const getLanguages = async () => {
  return await db.language.findMany({
    include: {
      units: {
        include: {
          topics: {
            include: {
              multipleChoiceQuestions: true,
              trueFalseQuestions: true,
            },
          },
        },
      },
    },
  });
};

const updateLanguage = async (updatedLanguage: Language) => {
  return await db.language.update({
    where: { id: updatedLanguage.id },
    data: {
      name: updatedLanguage.name,
    },
  });
};

const deleteLanguage = async (id: Language["id"]) => {
  // const associatedUnits = await db.unit.findMany({ where: { languageId: id } });
  // const associatedTopicsLists = associatedUnits.flatMap(async (unit) => {
  //   (await db.topic.findMany({ where: { unitId: unit.id } })).flatMap(
  //     (topic) => {
  //       return topic;
  //     }
  //   );
  // });

  // const associatedTFQuestions = associatedTopicsLists.flatMap(
  //   async (topicList) => {
  //     return (await topicList).flatMap((topic) => {
  //       return db.trueFalseQuestion.deleteMany({
  //         where: { topicId: topic.id },
  //       });
  //     });
  //   }
  // );

  // TODO: Get topics and questions to delete

  const deleteUnits = db.unit.deleteMany({ where: { languageId: id } });
  const deleteLanguage = db.language.delete({ where: { id: id } });

  return await db.$transaction([deleteLanguage, deleteUnits]);
};

export default {
  createLanguage,
  getLanguages,
  updateLanguage,
  deleteLanguage,
};
