import Survey from "../models/Survey.ts";

class SurveyController {
  async getAllForUser(ctx: any) {
    //@TODO
    const surveys = await Survey.findByUser("1");

    ctx.response.status = 200;
    ctx.response.body = surveys;
  }
  async getSingle(ctx: any) {
    const id = ctx.params.id!;
    const survey = await Survey.findById(id);
    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Incorrect ID" };
      return;
    }
    ctx.response.body = survey;
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
