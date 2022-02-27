import User from "../models/User.ts";
class AuthController {
  login() {
  }
  async register(ctx: any) {
    const body = await ctx.request.body();
    const { name, email, password } = await body.value;
    const user = await User.findOne({ email });
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Email is already used" };
    }

    const insertId = await User.insertOne({
      username: "user1",
      password: "pass1",
    });
    console.log("insertId", insertId);
  }
}

const auth = new AuthController();

export default auth;
