import { NextFunction, Request, Response } from "express";
import { UnitService } from "../services";

const createUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, number } = req.body;
    const newUnit = await UnitService.createUnit(name, number);

    return res.status(201).json({
      message: "Succesfully created unit",
      unit: newUnit,
    });
  } catch (error) {
    return next(error);
  }
};

const getUnitByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { unitId } = req.params;
    const unit = await UnitService.getUnitByID(Number(unitId));

    return res.status(200).json({
      unit: unit,
    });
  } catch (error) {
    return next(error);
  }
};

const listUnits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const units = await UnitService.listUnits();

    return res.status(201).json({
      message: "Succesfully fetched units",
      unit: units,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { unitId } = req.params;
    const { newName, newNumber, newTopics } = req.body;

    const updatedUnit = await UnitService.updateUnit({
      id: Number(unitId),
      name: newName,
      number: newNumber,
    });

    return res.status(200).json({
      message: "Updated unit",
      unit: updatedUnit,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { unitId } = req.params;
    const deleteUnit = await UnitService.deleteUnit(Number(unitId));

    return res.status(200).json({
      deletedData: deleteUnit,
      message: "Successfully deleted unit",
    });
  } catch (error) {
    return next(error);
  }
};

const createTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, number } = req.body;
    const { unitId } = req.params;

    const newTopic = UnitService.createTopic(Number(unitId), name, number);

    return res.status(201).json({
      message: "Created topic",
      topic: newTopic,
    });
  } catch (error) {
    return next(error);
  }
};

const listTopicsByUnitID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { unitId } = req.params;

    return await UnitService.listTopicsByUnitID(Number(unitId));
  } catch (error) {
    return next(error);
  }
};

const getTopicByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topicId } = req.params;

    const topic = await UnitService.getTopicByID(Number(topicId));

    return res.status(200).json({
      topic: topic,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { unitId, topicId } = req.params;
    const deleteTopic = await UnitService.deleteTopic(
      Number(unitId),
      Number(topicId)
    );

    return res.status(200).json({
      message: "Deleted topic",
      deletedTopic: deleteTopic
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  createUnit,
  listUnits,
  updateUnit,
  getUnitByID,
  listTopicsByUnitID,
  deleteUnit,
  createTopic,
  getTopicByID,
  deleteTopic
};
