import { Router } from "express";
import { body, param } from "express-validator";
import { db } from "../../prisma";

import { hasValidAccessToken, hasRole } from "../middleware";

const unitRouter = Router();

unitRouter
  .route("/")
  .all(hasValidAccessToken)
  // Get all units
  .get(hasValidAccessToken, async (_, res) => {
    try {
      const units = await db.unit.findMany();

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
  })
  // Create Unit
  .post(
    hasRole("TEACHER") || hasRole("ADMIN"),
    body("name").isString(),
    body("number").isNumeric(),
    async (req, res) => {
      const { name, number } = req.body;

      try {
        const newUnit = await db.unit.create({
          data: {
            name: String(name),
            number: Number(number),
          },
        });
        // TODO Add status
        return res.json({
          message: "Successfully created unit",
          newUnit: {
            id: newUnit.id,
            name: newUnit.name,
            number: newUnit.number,
          },
        });
      } catch (error) {
        // TODO Add status
        return res.json({
          error: error,
        });
      }
    }
  );

// @route /api/unit/:unitId Read update and delete individual units
unitRouter
  .route("/:unitId")
  .all(param("unitId"))
  .get(async (req, res) => {
    const { unitId } = req.params;

    try {
      const unit = await db.unit.findUnique({
        where: {
          id: Number(unitId),
        },
      });

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
    hasRole("TEACHER") || hasRole("ADMIN"),
    async (req, res) => {
      const { unitId } = req.params;
      const { newName, newNumber, newTopics } = req.body;
      try {
        let changed = false;
        const unit = await db.unit.findUnique({
          where: { id: Number(unitId) },
        });

        if (unit == null) {
          return res.status(404).json({
            error: "Unit not found",
          });
        }

        if (newName) {
          await db.unit.update({
            where: {
              id: unit.id,
            },
            data: {
              name: newName,
            },
          });
          changed = true;
        }

        if (newNumber) {
          await db.unit.update({
            where: {
              id: unit.id,
            },
            data: {
              number: newNumber,
            },
          });
          changed = true;
        }

        if (newTopics) {
          await db.unit.update({
            where: {
              id: unit.id,
            },
            data: {
              topics: newTopics,
            },
          });
          changed = true;
        }

        if (changed) {
          const newUnit = await db.unit.findUnique({ where: { id: unit.id } });
          // TODO Add status
          return res.json({
            message: "Succesfully updated unit",
            unit: newUnit,
          });
        } else {
          // TODO Add status
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
      const deleted = await db.unit.delete({
        where: {
          id: Number(unitId),
        },
        include: {
          topics: true,
        },
      });
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
  .route("/:unitId/topic/")
  .all(param("unitId").isNumeric())
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
            topics: true
          }
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
  .all(param("unitId").isNumeric(), param("topicId").isNumeric())
  .delete(async (req, res) => {
    const { unitId, topicId } = req.params;

    try {
      const unit = await db.unit.update({
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

      if (unit) {
        return res.json({
          message: "Sucessfully updated unit",
          unit: unit,
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
