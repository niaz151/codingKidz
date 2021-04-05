import { Router } from "express";
import { body, param, validationResult } from "express-validator";

import { AuthMiddleware, ErrorMiddleware } from "../middleware";
import { UnitController } from "../controllers";

import { db } from "../prisma";

const unitRouter = Router();

unitRouter
  .route("/")
  // Require access token for all DB interaction
  .all(AuthMiddleware.hasValidAccessToken, (_, __, next) => {
    next();
  })
  // Require teacher or admin permission to create, update, or delete any resources
  .post(AuthMiddleware.hasRoles(["TEACHER", "ADMIN"]), (_, __, next) => {
    next();
  })
  .put(AuthMiddleware.hasRoles(["TEACHER", "ADMIN"]), (_, __, next) => {
    next();
  })
  .delete(AuthMiddleware.hasRoles(["TEACHER", "ADMIN"]), (_, __, next) => {
    next();
  });

unitRouter
  .route("/")
  // Get all units
  .get(UnitController.listUnits)
  // Create Unit
  .post(
    body("name").isString(),
    body("number").isNumeric(),
    ErrorMiddleware.checkForValidationErrors,
    UnitController.createUnit
  );

unitRouter
  .route("/:unitId")
  .all(
    param("unitId").custom(async (unitId) => {
      const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });
      if (!unit) {
        throw new Error("Unit does not exist");
      }

      return true;
    }),
    ErrorMiddleware.checkForValidationErrors
  )
  // Get unit from id
  .get(UnitController.getUnitByID)
  // Update unit
  .put(
    body("newName").isAlpha(),
    body("newNumber").isNumeric(),
    body("newTopics"),
    ErrorMiddleware.checkForValidationErrors,
    UnitController.updateUnit
  )
  // Delete unit and related topics and questions
  .delete(UnitController.deleteUnit);

unitRouter
  .route("/:unitId/topic/")
  .all(
    param("unitId").custom(async (unitId) => {
      const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });

      if (!unit) {
        throw new Error("Unit does not exist");
      }

      return true;
    }),
    ErrorMiddleware.checkForValidationErrors
  )
  .get(UnitController.listTopicsByUnitID)
  .post(
    body("name").isAlphanumeric(),
    body("number").isNumeric(),
    ErrorMiddleware.checkForValidationErrors,
    UnitController.createTopic
  );

unitRouter
  .route("/:unitId/topic/:topicId")
  .all(
    param("unitId").custom(async (unitId) => {
      const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });

      if (!unit) {
        throw new Error("Unit does not exist");
      }

      return true;
    }),
    param("topicId").custom(async (topicId) => {
      const topic = await db.topic.findUnique({
        where: { id: Number(topicId) },
      });

      if (!topic) {
        throw new Error("Topic does not exist");
      }

      return true;
    }),
    ErrorMiddleware.checkForValidationErrors
  )
  // Get topic info by id
  .get(UnitController.getTopicByID)
  // Delete a specific topic
  .delete(UnitController.deleteTopic);

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
