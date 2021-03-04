import { PrismaPromise, Prisma } from "@prisma/client";
import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { db } from "../../prisma";

import { hasRole, hasValidAccessToken } from "../middleware";

const unitRouter = Router();

unitRouter
  .route("/")
  // Get all units
  .all(hasValidAccessToken)
  .get(async (_, res) => {
    try {
      const units = await db.unit.findMany();

      return res.status(200).json({
        units: units,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  })
  // Create Unit
  .post(
    body("name").isString(),
    body("number").isNumeric(),
    async (req, res) => {
      // Deal with validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      // If no validation errors occured, these fields will exist
      const { name, number } = req.body;

      try {
        const newUnit = await db.unit.create({
          data: {
            name: String(name),
            number: Number(number),
          },
        });
        return res.status(201).json({
          message: "Successfully created unit",
          newUnit: {
            id: newUnit.id,
            name: newUnit.name,
            number: newUnit.number,
          },
        });
      } catch (error) {
        return res.status(500).json({
          error: error,
        });
      }
    }
  );

unitRouter
  .route("/:unitId")
  .all(param("unitId"))
  // Get unit from id
  .get(async (req, res) => {
    // Deal with validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { unitId } = req.params;

    try {
      const unit = await db.unit.findUnique({
        where: {
          id: Number(unitId),
        },
      });

      return res.status(200).json({
        unit: unit,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  })
  // Update unit
  .put(
    body("newName"),
    body("newNumber"),
    body("newTopics"),
    async (req, res) => {
      // Deal with validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { unitId } = req.params;
      const { newName, newNumber, newTopics } = req.body;

      try {
        const unit = await db.unit.findUnique({
          where: { id: Number(unitId) },
        });

        if (unit == null) {
          return res.status(404).json({
            error: "Unit not found",
          });
        }

        const updatedUnit = await db.unit.update({
          where: {
            id: unit.id,
          },
          data: {
            name: newName ?? undefined,
            number: newNumber ?? undefined,
            topics: newTopics ?? undefined,
          },
        });

        return res.status(200).json({
          message: "Succesfully updated unit",
          unit: updatedUnit,
        });
      } catch (error) {
        // TODO Add status
        return res.json({
          error: error,
        });
      }
    }
  )
  // Delete unit and related topics and questions
  .delete(param("unitId").isNumeric(), async (req, res) => {
    // Deal with validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { unitId } = req.params;

    try {
      const originalUnitWithTopics = await db.unit.findUnique({
        where: { id: Number(unitId) },
        include: { topics: true },
      });

      if (!originalUnitWithTopics) {
        return res.status(404).json({
          error: "Unit not found",
        });
      }

      const deleteTopics = db.topic.deleteMany({
        // await db.topic.deleteMany({
        where: { id: originalUnitWithTopics?.id },
      });

      // const deleteQuestions: typeof deleteTopics[] = [];
      // const deleteQuestions = originalUnitWithTopics.topics.map((topic) => {
      // originalUnitWithTopics.topics.map(async (topic) => {
      //   deleteQuestions.push(
      //     db.multipleChoiceQuestion.deleteMany({ where: { topicId: topic.id } })
      //   );
      //   deleteQuestions.push(
      //     db.trueFalseQuestion.deleteMany({ where: { topicId: topic.id } })
      //   );
      // });

      const deleteUnit = db.unit.delete({
        // await db.unit.delete({
        where: {
          id: originalUnitWithTopics.id,
        },
        include: {
          topics: true,
        },
      });

      // delete properly with transactions
      const deleteAll = await db.$transaction([
        // ...deleteQuestions,
        deleteTopics,
        deleteUnit,
      ]);

      return res.status(200).json({
        message: "Successfully deleted unit",
        transaction: deleteAll,
      });
    } catch (error) {
      // TODO Add status
      return res.json({
        error,
      });
    }
  });

unitRouter
  .route("/:unitId/topic/")
  .all(param("unitId").isNumeric())
  // Get topics for a unit
  .get(async (req, res) => {
    const { unitId } = req.params;

    const unitWithTopics = await db.unit.findUnique({
      where: {
        id: Number(unitId),
      },
      include: {
        topics: true,
      },
    });

    if (unitWithTopics == null) {
      return res.status(404).json({
        error: `Could not find unit ${unitId}`,
      });
    }

    return res.json({
      topics: unitWithTopics.topics,
    });
  })
  // Create a new topic
  .post(
    body("name").isAlphanumeric(),
    body("number").isNumeric(),
    async (req, res) => {
      const { unitId } = req.params;
      const { name, number } = req.body;

      try {
        const updatedUnit = await db.unit.update({
          where: {
            id: Number(unitId),
          },
          data: {
            topics: {
              create: {
                name: name,
                number: Number(number),
              },
            },
          },
          include: {
            topics: true,
          },
        });

        if (updatedUnit) {
          return res.json({
            message: "Sucessfully added topic",
            unit: updatedUnit,
          });
        } else {
          return res.status(404).json({
            error: "Unit not found",
          });
        }
      } catch (error) {
        return res.status(500).json({
          error: error,
        });
      }
    }
  );

unitRouter
  .route("/:unitId/topic/:topicId")
  .all(
    param("unitId").isNumeric(),
    param("topicId").isNumeric(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      return next();
    }
  )
  // Delete a specific topic
  .delete(async (req, res) => {
    const { unitId, topicId } = req.params;

    try {
      // Need to delete all linked questions before deleting topic
      // const deleteQuestions = [
      //   db.multipleChoiceQuestion.deleteMany({
      //     where: {
      //       topicId: Number(topicId),
      //     },
      //   }),
      //   db.trueFalseQuestion.deleteMany({
      //     where: { topicId: Number(topicId) },
      //   }),
      // ];

      // Need to disconnect topic from unit before deleting topic
      const deleteTopic = db.unit.update({
        where: {
          id: Number(unitId),
        },
        data: {
          topics: {
            delete: {
              id: Number(topicId),
            },
          },
        },
      });

      // Now that the topic has no relations, it can be deleted (ominous)
      // const deleteTopic = db.topic.delete({
      //   where: {
      //     id: Number(topicId),
      //   },
      // });

      // Delete topic using transaction to ensure everything succeeds or nothing is carried out
      const completed = await db.$transaction([
        // ...deleteQuestions,
         deleteTopic
      ]);

      if (completed) {
        return res.json({
          message: "Sucessfully deleted topic",
          completed: completed,
        });
      } else {
        return res.status(500).json({
          error: "Unit not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  });

unitRouter
  .route("/:unitId/topic/:topicId/question")
  .all(param("unitId").isInt(), param("topicId").isInt(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    return next();
  })
  // Get questions for a specific topic
  .get(async (req, res) => {
    const { unitId, topicId } = req.params;
    // const unitWithTopicAndQuestions = await db.unit.findUnique({
    //   where: {
    //     id: Number(unitId),
    //   },
    //   include: {
    //     topics: {
    //       where: {
    //         id: Number(topicId),
    //       },
    //       include: {
    //         multipleChoiceQuestions: true,
    //         trueFalseQuestions: true
    //       },
    //     },
    //   },
    // });

    return res.json({
      message: "Succesfully fetched questions (not really)",
      // questions: unitWithTopicAndQuestions,
    });
  });
  // Create question
  // .post(body("question"), body("questionImage"), async (req, res) => {
  //   const { unitId, topicId } = req.params;

  //   const { question, questionImage } = req.body;

  //   const updatedUnit = await db.unit.update({
  //     where: {
  //       id: Number(unitId),
  //     },
  //     data: {
  //       topics: {
  //         update: {
  //           where: {
  //             id: Number(topicId),
  //           },
  //           data: {
  //             multipleChoiceQuestions: {
  //               create: {
  //                 question: question,
                  
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

    // return res.json({
    //   message: "Successfully created question",
    //   unit: updatedUnit,
    // });
  // });

unitRouter
  .route("/:unitId/topic/:topicId/question/:questionId")
  .all(
    param("unitId").isInt(),
    param("topicId").isInt(),
    param("questionId").isInt(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      return next();
    }
  )
  // Delete question
  .delete(async (req, res) => {
    const { unitId, topicId, questionId } = req.params;

    

    // const disconnectFromTopics = await db.topic.update({
    //   where: {
    //     id: Number(topicId)
    //   },
    //   data: {
    //     multipleChoiceQuestions: {
    //       disconnect: {
    //         id: Number(questionId)
    //       }
    //     }
    //   }
    // });



    return res.status(200).json({
      message: "Successfully deleted question (not really)",
    });
  });

export { unitRouter };
