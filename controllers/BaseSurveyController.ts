import Survey from "../models/Survey.ts";

export default class BaseSurveyController {
  async findSurveyOrFail(
    id: string,
    ctx: any,
  ): Promise<Survey | null> {
    const survey = await Survey.findById(id);
    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Incorrect ID" };
      return null;
    }
    return survey;
  }
}
