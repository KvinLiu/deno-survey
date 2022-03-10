import { key } from "./../controllers/AuthController.ts";
import { verify } from "../deps.ts";
import User from "../models/User.ts";

export const authMiddleware = async (
  ctx: any,
  next: Function,
) => {
  const headers = ctx.request.headers;
  const authHeader = headers.get("Authorization");
  if (!authHeader) {
    ctx.response.status = 401;
    return;
  }
  const jwt = authHeader.split(" ")[1];
  if (!jwt) {
    ctx.response.status = 401;
    return;
  }
  try {
    const payload = await verify(jwt, key);
    const user = await User.findOne({ email: payload.iss });
    ctx.state.user = user;
    await next();
  } catch (e) {
    console.log(e);
    ctx.response.status = 401;
    return;
  }
};
