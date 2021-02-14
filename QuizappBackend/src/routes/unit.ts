import { Router } from "express";
import { body, param } from "express-validator";
import { Unit, IUnit, Topic } from "../models";
import mongoose from "mongoose";

import { hasValidAccessToken, hasValidAccessTokenAndRole } from "../middleware";
import { ROLES } from "../utils";

const unitRouter = Router();

unitRouter
  .route("/")
  .all(hasValidAccessToken)
  .post(
    hasValidAccessToken,
    body("name").isString(),
    body("number").isNumeric(),
    async (req, res) => {
      const { name, number } = req.body;
      try {
        const newUnitContent: IUnit = {
          name: String(name),
          number: Number(number),
        };

        const newUnit = await Unit.create(newUnitContent);
        // TODO Add status
        return res.json({
          message: "Successfully created unit",
          newUnit: newUnit.toJSON(),
        });
      } catch (error) {
        // TODO Add status
        return res.json({
          error: error,
        });
      }
    }
  )
  .get(hasValidAccessTokenAndRole(ROLES.Admin), async (_, res) => {
    try {
      const units = await Unit.find();

      // TODO Add status
      return res.json({
        units: units,
      });
    } catch (error) {
      // TODO Add status
      return res.json({
        error: error,
      });
    }
  });

// @route /api/units/:unitId Read update and delete individual units
unitRouter
  .route("/:unitId")
  .all(param("unitId"))
  .get(async (req, res) => {
    const { unitId } = req.params;

    try {
      const unit = await Unit.findById(unitId);
      // TODO Add status
      return res.json({
        unit: unit,
      });
    } catch (error) {
      // TODO Add status
      return res.json({
        error: error,
      });
    }
  })
  .post(
    body("newName"),
    body("newNumber"),
    body("newTopics"),
    async (req, res) => {
      const { unitId } = req.params;
      const { newName, newNumber, newTopics } = req.body;
      try {
        let changed = false;
        const unit = Unit.findById(unitId);

        if (newName) {
          await unit.update({ _id: unitId }, { name: newName });
          changed = true;
        }

        if (newNumber) {
          await unit.update({
            number: newNumber,
          });
          changed = true;
        }

        if (newTopics) {
          await unit.update({
            topics: newTopics,
          });
          changed = true;
        }

        if (changed) {
          const newUnit = await Unit.findById(unitId);
          return res.json({
            message: "Succesfully updated unit",
            unit: newUnit,
          });
        } else {
          return res.json({
            message: "No changes made",
            unit: unit,
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
    const { unitId } = req.params;

    try {
      const deleted = await Unit.findByIdAndDelete(unitId);
      // TODO Add status
      return res.json({
        message: `Successfully deleted unit ${deleted?.name}`,
      });
    } catch (error) {
      // TODO Add status
      return res.json({
        error: error,
      });
    }
  });

unitRouter
  .route("/:unitId/topics/:topicId")
  .post(body("unitId"), body("topicId"), async (req, res) => {
    const { unitId, topicId } = req.params;

    console.log("unitId, topicId: ", unitId, topicId);

    const topic = await Topic.findById(topicId);

    if (topic === null) {
      return res.status(404).json({
        error: "Topic not found",
      });
    }

    try {
      const topicID = new mongoose.Types.ObjectId(topicId);
      
      const unit = await Unit.findByIdAndUpdate(unitId, {
        $push: { topics: topicID },
      });

      if (unit) {
        return res.json({
          unit: unit,
          message: "Sucessfully updated unit",
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
  })
  .delete(body("unitId"), body("topicId"), async (req, res) => {
    const { unitId, topicId } = req.body;

    try {
      const topic = await Topic.findById(topicId);

      if (!topic) {
        return res.status(404).json({
          error: "Topic not found, did not remove from unit",
        });
      }

      const unit = await Unit.findByIdAndUpdate(unitId, {
        $pull: { topics: topicId },
      });

      if (unit) {
        return res.json({
          unit: unit,
          message: "Sucessfully updated unit",
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
  });

export { unitRouter };
