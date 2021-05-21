import { Router } from "express";
import { body, param } from "express-validator";

import { AuthMiddleware, ErrorMiddleware } from "../middleware";
import {
  LanguageController,
  QuestionController,
  TopicController,
  UnitController,
} from "../controllers";

import { UnitValidator } from "../validators";

const languageRouter = Router();

languageRouter
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

languageRouter
  .route("/")
  .get(LanguageController.getLanguages)
  .post(
    body("name"),
    ErrorMiddleware.checkForValidationErrors,
    LanguageController.createLanguage
  );

languageRouter
  .route("/:languageId")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
    ErrorMiddleware.checkForValidationErrors
  )
  .post(
    body("name"),
    ErrorMiddleware.checkForValidationErrors,
    LanguageController.updateLanguage
  )
  .delete(LanguageController.deleteLanguage);

languageRouter
  .route("/:languageId/unit")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
    ErrorMiddleware.checkForValidationErrors
  )
  // Get all units
  .get(UnitController.listUnits)
  // Create Unit
  .post(
    body("name").isString(),
    body("number").isNumeric(),
    ErrorMiddleware.checkForValidationErrors,
    UnitController.createUnit
  );

languageRouter
  .route("/:languageId/unit/:unitId")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
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

languageRouter
  .route("/:languageId/unit/:unitId/topic/")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
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

languageRouter
  .route("/:languageId/unit/:unitId/topic/:topicId")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    ErrorMiddleware.checkForValidationErrors
  )
  // Get topic info by id
  .get(TopicController.getTopicByID)
  // Delete a specific topic
  .delete(TopicController.deleteTopic);

languageRouter
  .route("/:languageId/unit/:unitId/topic/:topicId/question")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    ErrorMiddleware.checkForValidationErrors
  )
  // Get questions for a specific topic
  .get(QuestionController.getQuestionsByTopicID);

languageRouter
  .route("/:languageId/unit/:unitId/topic/:topicId/question/multiplechoice")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
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

languageRouter
  .route("/:languageId/unit/:unitId/topic/:topicId/question/truefalse")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
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

languageRouter
  .route("/:languageId/unit/:unitId/topic/:topicId/question/:questionId")
  .all(
    param("languageId").custom(UnitValidator.isValidLanguageID),
    param("unitId").custom(UnitValidator.isValidUnitID),
    param("topicId").custom(UnitValidator.isValidTopicID),
    param("questionId").isInt(),
    ErrorMiddleware.checkForValidationErrors
  )
  // Delete question
  .delete(QuestionController.deleteQuestion);

export default languageRouter;
