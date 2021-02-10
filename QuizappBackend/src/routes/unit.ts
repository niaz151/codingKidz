import { Router } from "express";
import { body, param } from "express-validator";
import { Unit } from "../models";

import { checkAccessToken } from "../middleware";

const unitRouter = Router();

unitRouter
  .route("/units")
  .all(checkAccessToken)
  .post(
    checkAccessToken,
    body("name").isString(),
    body("number").isNumeric(),
    async (req, res) => {
      const { name, number } = req.body;
      try {
        const newUnit = await Unit.create({
          name: String(name),
          number: Number(number),
        });
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
  .get(async (_, res) => {
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
  .route("/units/:unitId")
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

export { unitRouter };
