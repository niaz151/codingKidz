import { Router } from "express";
import { body, param } from "express-validator";
import { Topic } from "../models";

import { hasValidAccessToken } from "../middleware";

const topicRouter = Router();

topicRouter
  .route("/")
  .all(hasValidAccessToken)
  .post(
    hasValidAccessToken,
    body("name").isString(),
    body("number").isNumeric(),
    async (req, res) => {
      const { name, number } = req.body;
      try {
        const newTopic = await Topic.create({
          name: String(name),
          number: Number(number),
        });
        // TODO Add status
        return res.json({
          message: "Successfully created topic",
          newTopic: newTopic.toJSON(),
        });
      } catch (error) {
        // TODO Add status
        return res.json({
          error: error,
        });
      }
    }
  )
  .get(async (_, res) => {
    try {
      const topics = await Topic.find();

      // TODO Add status
      return res.json({
        topics: topics,
      });
    } catch (error) {
      // TODO Add status
      return res.json({
        error: error,
      });
    }
  });

// @route /api/topic/:topicId Read update and delete individual topics
topicRouter
  .route("/:topidId")
  .all(param("topicId"))
  .get(async (req, res) => {
    const { topicId } = req.params;

    try {
      const topic = await Topic.findById(topicId);
      // TODO Add status
      return res.json({
        topic: topic,
      });
    } catch (error) {
      // TODO Add status
      return res.json({
        error: error,
      });
    }
  })
  .put(
    body("newName"),
    body("newNumber"),
    body("newQuestions"),
    async (req, res) => {
      const { topicId } = req.params;
      const { newName, newNumber, newQuestions } = req.body;

      try {
        let changed = false;
        const topic = Topic.findById(topicId);

        if (newName) {
          await topic.update({ _id: topicId }, { name: newName });
          changed = true;
        }

        if (newNumber) {
          await topic.update({
            number: newNumber,
          });
          changed = true;
        }

        if (newQuestions) {
          await topic.update({
            questions: newQuestions,
          });
          changed = true;
        }

        if (changed) {
          const newTopic = await Topic.findById(topicId);
          return res.json({
            message: "Succesfully updated topic",
            topic: newTopic,
          });
        } else {
          return res.json({
            message: "No changes made",
            topic: topic,
          });
        }
      } catch (error) {
        // TODO Add status
        return res.json({
          error: error,
        });
      }
    }
  )
  .delete(async (req, res) => {
    const { topicId } = req.params;

    try {
      const deleted = await Topic.findByIdAndDelete(topicId);
      // TODO Add status
      return res.json({
        message: `Successfully deleted topic ${deleted?.name}`,
      });
    } catch (error) {
      // TODO Add status
      return res.json({
        error: error,
      });
    }
  });

export { topicRouter as topicRouter };
