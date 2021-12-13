import { NextFunction, Request, Response } from "express";
import { UnitService } from "../services";

const createUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { languageId } = req.params;
    const { name, number } = req.body;
    const status = "LOCKED";
    const newUnit = await UnitService.createUnit(
      Number(languageId),
      name,
      number,
      status
    );

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
    const { languageId } = req.params;
    const units = await UnitService.listUnits(Number(languageId));

    return res.status(201).json({
      message: "Succesfully fetched units",
      units: units,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { languageId, unitId } = req.params;
    const { newName, newNumber, newTopics, status } = req.body;

    const updatedUnit = await UnitService.updateUnit({
      languageId: Number(languageId),
      id: Number(unitId),
      name: newName,
      number: newNumber,
      status: status,
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
    const { languageId, unitId } = req.params;
    const deleteUnit = await UnitService.deleteUnit(
      Number(languageId),
      Number(unitId)
    );

    return res.status(200).json({
      deletedData: deleteUnit,
      message: "Successfully deleted unit",
    });
  } catch (error) {
    return next(error);
  }
};

const updateUnitTitle = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { languageId, unitId, title } = req.params;
    const unitData = await UnitService.updateUnitTitle(Number(languageId), Number(unitId), title);
    return res.status(200).json({
      message: "Updated Unit Title",
      unitData: unitData
    })
  } catch (error) {
    return next(error);
  }
}


export default {
  createUnit,
  listUnits,
  updateUnit,
  getUnitByID,
  deleteUnit,
  updateUnitTitle
};
