import { /*Request, Response,*/ Application } from "express";
import QuestionsController from "../controllers/questions.controller";

export default class QuestionsRouter {
  public questionsController: QuestionsController = new QuestionsController();

  public routes(app: Application): void {
    app.route("/questions").get(this.questionsController.getQuestions);
  }
}
