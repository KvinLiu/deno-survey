import { Router } from "./deps.ts";
import authController from "./controllers/AuthController.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "hello world! again and again";
  })
  .post("/api/login", authController.login)
  .post("/api/register", authController.register);

export default router;
