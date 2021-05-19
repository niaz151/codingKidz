import { NextFunction, Request, Response } from "express";
import { LanguageService } from "../services";

const createLanguage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const newLanguage = await LanguageService.createLanguage(name);

    return res.status(201).json({
      message: "Succesfully created language",
      language: newLanguage,
    });
  } catch (error) {
    return next(error);
  }
};

const getLanguages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const languages = await LanguageService.getLanguages();

    return res.status(201).json({
      message: "Succesfully fetched languages",
      languages: languages,
    });
  } catch (error) {
    return next(error);
  }
};

const updateLanguage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { languageId } = req.params;
    const { name } = req.body;
    const language = await LanguageService.updateLanguage({
      id: Number(languageId),
      name: name,
    });

    return res.status(201).json({
      message: "Succesfully updated language",
      language: language,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteLanguage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { languageId } = req.params;
    const language = await LanguageService.deleteLanguage(Number(languageId));

    return res.status(200).json({
      message: "Successfully deleted language",
      language: language,
    });
  } catch (error) {
    return next(error);
  }
};

export default { createLanguage, getLanguages, updateLanguage, deleteLanguage };
