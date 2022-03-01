import Survey from "../models/Survey.ts";

class SurveyController {
  async getAllForUser(ctx: any) {
    //@TODO
    const surveys = await Survey.findByUser("1");
    console.log(surveys);
    ctx.response.body = surveys;
  }
  async getSingle(ctx: any) {
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
  }
  async delete(ctx: any) {
  }
}

const survey = new SurveyController();
export default survey;
