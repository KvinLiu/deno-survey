import User from "../models/User.ts";
import { compareSync, create, getNumericDate, hashSync } from "../deps.ts";

export const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
class AuthController {
  async login(ctx: any) {
    const body = await ctx.request.body();
    const { email, password } = await body.value;
    if (!email || !password) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Please provide email and password" };
      return;
    }
    let user = await User.findOne({ email });
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Incorrect Email!" };
      return;
    }
    if (!compareSync(password, user.password)) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Incorrect password" };
      return;
    }
    const jwt = await create(
      { alg: "HS512", typ: "JWT" },
      {
        iss: user.email,
        exp: getNumericDate(60 * 60),
      },
      key,
    );
    ctx.response.status = 201;
    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      jwt,
    };
  }
  async register(ctx: any) {
    const body = await ctx.request.body();
    const { name, email, password } = await body.value;
    let user = await User.findOne({ email });
    if (user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Email is already used" };
      return;
    }
    const hashedPassword = hashSync(password);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

const auth = new AuthController();

export default auth;
