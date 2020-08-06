import Questions from "../models/questions.model";
import { Request, Response, NextFunction } from "express";

export default class QuestionsController {
  public getQuestions(req: Request, res: Response, next: NextFunction) {
    Questions.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }
}
