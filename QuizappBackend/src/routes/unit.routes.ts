import { Router } from "express";
import { body, param, validationResult } from "express-validator";

import { AuthMiddleware, ErrorMiddleware } from "../middleware";
import { QuestionController, TopicController, UnitController } from "../controllers";

import { db } from "../prisma";
import { UnitValidator } from "../validators";

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
    param("unitId").custom(UnitValidator.isValidUnitID),
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
    param("unitId").custom(UnitValidator.isValidUnitID),
    ErrorMiddleware.checkForValidationErrors
  )
  .get(TopicController.listTopicsByUnitID)
  .post(
    body("name").isAlphanumeric(),
    body("number").isNumeric(),
    ErrorMiddleware.checkForValidationErrors,
    TopicController.createTopic
  );

unitRouter
  .route("/:unitId/topic/:topicId")
  .all(
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    ErrorMiddleware.checkForValidationErrors
  )
  // Get topic info by id
  .get(TopicController.getTopicByID)
  // Delete a specific topic
  .delete(TopicController.deleteTopic);

unitRouter
  .route("/:unitId/topic/:topicId/question/multiplechoice")
  .all(
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    ErrorMiddleware.checkForValidationErrors,
  )
  // Get questions for a specific topic
  .get(QuestionController.getQuestionsByTopicID)
  // Create question
  .post(
    body("question"),
    body("questionImage"),
    body("correctAnswer"),
    body("correctAnswerImage"),
    body("wrongAnswer0"),
    body("wrongAnswer0Image"),
    body("wrongAnswer1"),
    body("wrongAnswer1Image"),
    body("wrongAnswer2"),
    body("wrongAnswer2Image"),
    ErrorMiddleware.checkForValidationErrors,
    QuestionController.
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
