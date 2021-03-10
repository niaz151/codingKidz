import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { db } from "../../prisma";

import { hasRole, hasValidAccessToken } from "../middleware";

const unitRouter = Router();

unitRouter
  .route("/")
  // Require access token for all DB interaction
  .all(hasValidAccessToken, (_, __, next) => {
    next();
  })
  // Require teacher or admin permission to create, update, or delete any resources
  .post(hasRole(["TEACHER", "ADMIN"]), (_, __, next) => {
    next();
  })
  .put(hasRole(["TEACHER", "ADMIN"]), (_, __, next) => {
    next();
  })
  .delete(hasRole(["TEACHER", "ADMIN"]), (_, __, next) => {
    next();
  });

unitRouter
  .route("/")
  // Get all units
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
  .all(param("unitId"), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { unitId } = req.params;

    const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });

    if (!unit) {
      return res.status(400).json({
        error: "Unit not found",
      });
    }

    return next();
  })
  // Get unit from id
  .get(async (req, res) => {
    const { unitId } = req.params;

    try {
      const unit = await db.unit.findUnique({
        where: {
          id: Number(unitId),
        },
        include: {
          topics: {
            include: {
              multipleChoiceQuestions: true,
              trueFalseQuestions: true,
            },
          },
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
        return res.status(500).json({
          error: error,
        });
      }
    }
  )
  // Delete unit and related topics and questions
  .delete(async (req, res) => {
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
      return res.status(500).json({
        error,
      });
    }
  });

unitRouter
  .route("/:unitId/topic/")
  .all(param("unitId").isNumeric(), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { unitId } = req.params;

    const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });

    if (!unit) {
      return res.status(400).json({
        error: "Unit not found",
      });
    }

    return next();
  })
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
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { unitId, topicId } = req.params;

      const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });

      if (!unit) {
        return res.status(400).json({
          error: "Unit not found",
        });
      }

      const topic = await db.topic.findUnique({
        where: { id: Number(topicId) },
      });

      if (!topic) {
        return res.status(400).json({
          error: "Topic not found",
        });
      }

      return next();
    }
  )
  // Get topic info by id
  .get(async (req, res) => {
    const { topicId } = req.params;

    try {
      const topic = await db.topic.findUnique({
        where: {
          id: Number(topicId),
        },
        include: {
          multipleChoiceQuestions: true,
          trueFalseQuestions: true,
        },
      });

      return res.json({
        message: "Successfully fetched topic info",
        topic: topic,
      });
    } catch (error) {}
  })
  // Delete a specific topic
  .delete(async (req, res) => {
    const { unitId, topicId } = req.params;

    try {
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
  .all(
    param("unitId").isInt(),
    param("topicId").isInt(),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { unitId, topicId } = req.params;

      const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });

      if (!unit) {
        return res.status(400).json({
          error: "Unit not found",
        });
      }

      const topic = await db.topic.findUnique({
        where: { id: Number(topicId) },
      });

      if (!topic) {
        return res.status(400).json({
          error: "Topic not found",
        });
      }

      return next();
    }
  )
  // Get questions for a specific topic
  .get(async (req, res) => {
    const { topicId } = req.params;
    const trueFalseQuestions = await db.trueFalseQuestion.findMany({
      where: {
        topicId: Number(topicId),
      },
    });

    const multipleChoiceQuestions = await db.multipleChoiceQuestion.findMany({
      where: {
        topicId: Number(topicId),
      },
    });

    return res.json({
      message: "Succesfully fetched questions",
      trueFalseQuestions: trueFalseQuestions,
      multipleChoiceQuestions: multipleChoiceQuestions,
    });
  })
  // Create question
  .post(
    body("question"),
    body("questionImage").optional(),
    body("correctAnswer"),
    body("correctAnswerImage"),
    body("wrongAnswer0"),
    body("wrongAnswer0Image"),
    body("wrongAnswer1"),
    body("wrongAnswer1Image"),
    body("wrongAnswer2"),
    body("wrongAnswer2Image"),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { topicId } = req.params;

      const {
        question,
        questionImage,
        correctAnswer,
        correctAnswerImage,
        wrongAnswer0,
        wrongAnswer0Image,
        wrongAnswer1,
        wrongAnswer1Image,
        wrongAnswer2,
        wrongAnswer2Image,
      } = req.body;

      const updatedUnit = await db.topic.update({
        where: {
          id: Number(topicId),
        },
        data: {
          multipleChoiceQuestions: {
            create: {
              question: question,
              ...(questionImage && { questionImage: questionImage }),
              correctAnswer: correctAnswer,
              ...(correctAnswerImage && {
                correctAnswerImage: correctAnswerImage,
              }),
              wrongAnswer0: wrongAnswer0,
              ...(wrongAnswer0Image && {
                wrongAnswer0Image: wrongAnswer0Image,
              }),
              wrongAnswer1: wrongAnswer1,
              ...(wrongAnswer1Image && {
                wrongAnswer1Image: wrongAnswer1Image,
              }),
              wrongAnswer2: wrongAnswer2,
              ...(wrongAnswer2Image && {
                wrongAnswer2Image: wrongAnswer2Image,
              }),
            },
          },
        },
        include: {
          multipleChoiceQuestions: true,
        },
      });

      return res.json({
        message: "Successfully created question",
        unit: updatedUnit,
      });
    }
  );

unitRouter
  .route("/:unitId/topic/:topicId/question/:questionId")
  .all(
    param("unitId").isInt(),
    param("topicId").isInt(),
    param("questionId").isInt(),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { unitId, topicId, questionId } = req.params;

      const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });

      if (!unit) {
        return res.status(400).json({
          error: "Unit not found",
        });
      }

      const topic = await db.topic.findUnique({
        where: { id: Number(topicId) },
      });

      if (!topic) {
        return res.status(400).json({
          error: "Topic not found",
        });
      }

      // TODO check question ID

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
