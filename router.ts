import { Router } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import surveyController from "./controllers/SurveyController.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "hello world! again and again";
  })
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // Survey
  .get("/api/survey", surveyController.getAllForUser)
  .get("/api/survey/:id", surveyController.getSingle.bind(surveyController))
  .post("/api/survey", surveyController.create)
  .put("/api/survey/:id", surveyController.update.bind(surveyController))
  .delete("/api/survey", surveyController.delete);

export default router;
