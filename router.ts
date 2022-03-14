import { Router } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import surveyController from "./controllers/SurveyController.ts";
import questionController from "./controllers/QuestionController.ts";
import { authMiddleware } from "./middlewares/authMiddleWare.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "hello world! again and again";
  })
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // Survey
  .get(
    "/api/survey",
    authMiddleware,
    surveyController.getAllForUser.bind(surveyController),
  )
  .get(
    "/api/survey/:id",
    authMiddleware,
    surveyController.getSingle.bind(surveyController),
  )
  .post(
    "/api/survey",
    authMiddleware,
    surveyController.create.bind(surveyController),
  )
  .put(
    "/api/survey/:id",
    authMiddleware,
    surveyController.update.bind(surveyController),
  )
  .delete(
    "/api/survey/:id",
    authMiddleware,
    surveyController.delete.bind(surveyController),
  )
  // Question
  .get(
    "/api/survey/:surveyId/questions",
    authMiddleware,
    questionController.getBySurvey.bind(questionController),
  )
  .get(
    "/api/question/:id",
    authMiddleware,
    questionController.getSingle.bind(questionController),
  )
  .post(
    "/api/question/:surveyId",
    authMiddleware,
    questionController.create.bind(questionController),
  )
  .put(
    "/api/question/:id",
    authMiddleware,
    questionController.update.bind(questionController),
  )
  .delete(
    "/api/question/:id",
    authMiddleware,
    questionController.delete.bind(questionController),
  );

export default router;
