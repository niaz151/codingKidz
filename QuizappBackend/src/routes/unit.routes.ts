import { Router } from "express";
import { body, param, validationResult } from "express-validator";

import { AuthMiddleware, ErrorMiddleware } from "../middleware";
import {
  QuestionController,
  TopicController,
  UnitController,
} from "../controllers";

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
  .route("/:unitId/topic/:topicId/question")
  .all(
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    ErrorMiddleware.checkForValidationErrors
  )
  // Get questions for a specific topic
  .get(QuestionController.getQuestionsByTopicID);

unitRouter
  .route("/:unitId/topic/:topicId/question/multiplechoice")
  .all(
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    ErrorMiddleware.checkForValidationErrors
  )
  .post(
    // Create question
    body("question"),
    body("questionImage").optional(),
    body("correctAnswer"),
    body("correctAnswerImage").optional(),
    body("wrongAnswer0"),
    body("wrongAnswer0Image").optional(),
    body("wrongAnswer1"),
    body("wrongAnswer1Image").optional(),
    body("wrongAnswer2"),
    body("wrongAnswer2Image").optional(),
    ErrorMiddleware.checkForValidationErrors,
    QuestionController.createMultipleChoiceQuestion
  );

unitRouter
  .route("/:unitId/topic/:topicId/question/truefalse")
  .all(
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    ErrorMiddleware.checkForValidationErrors
  )
  .post(
    // Create question
    body("question"),
    body("questionImage").optional(),
    body("correctAnswer"),
    ErrorMiddleware.checkForValidationErrors,
    QuestionController.createTrueFalseQuestion
  );

unitRouter
  .route("/:unitId/topic/:topicId/question/:questionId")
  .all(
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    param("questionId").isInt(),
    ErrorMiddleware.checkForValidationErrors
  )
  // Delete question
  .delete(QuestionController.deleteQuestion);

export { unitRouter };
