import Survey from "../models/Survey.ts";
import BaseSurveyController from "./BaseSurveyController.ts";

class SurveyController extends BaseSurveyController {
  async getAllForUser(ctx: any) {
    //@TODO
    const surveys = await Survey.findByUser("1");

    ctx.response.status = 200;
    ctx.response.body = surveys;
  }
  async getSingle(ctx: any) {
    const id = ctx.params.id!;
    const survey = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      ctx.response.status = 200;
      ctx.response.body = survey;
    }
  }
  async create(ctx: any) {
    const body = await ctx.request.body();
    const { name, description } = await body.value;

    // TODO
    const survey = new Survey("1", name, description);
    await survey.create();

    ctx.response.status = 201;
    ctx.response.body = survey;
  }

  async update(ctx: any) {
    const id = ctx.params.id!;
    const survey = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      const body = await ctx.request.body();
      const { name, description } = await body.value;
      let survey = await Survey.update({ id, name, description });
      ctx.response.body = survey;
    }
  }
  async delete(ctx: any) {
    const id = ctx.params.id!;
    const survey = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      Survey.delete(survey.id);
      ctx.response.status = 204;
    }
  }
}

const survey = new SurveyController();
export default survey;
