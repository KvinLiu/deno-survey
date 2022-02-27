import User from "../models/User.ts";
import { compareSync, hashSync } from "../deps.ts";
class AuthController {
  login() {
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
