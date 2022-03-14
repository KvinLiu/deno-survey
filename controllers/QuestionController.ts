import Question from "../models/Question.ts";
import Survey from "../models/Survey.ts";
import User from "../models/User.ts";
import BaseSurveyController from "./BaseSurveyController.ts";

class QuestionController extends BaseSurveyController {
  async getBySurvey(ctx: any) {
    const surveyId = ctx.params.id;
    const survey = await this.findSurveyOrFail(surveyId, ctx);
    if (survey) {
      const questions = await Question.findBySurvey(surveyId);
      ctx.response.body = questions;
    }
  }
  async getSingle(ctx: any) {
  }
  async create(ctx: any) {
  }

  async update(ctx: any) {
  }
  async delete(ctx: any) {
  }
}
export default new QuestionController();
