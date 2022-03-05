import { usersCollection } from "./../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class User extends BaseModel {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  constructor({ id = "", name = "", email = "", password = "" }) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static async findOne(params: object) {
    let user = await usersCollection.findOne(params);
    if (!user) return;
    return User.prepare(user);
  }
  async save() {
    delete this.id;
    await usersCollection.insertOne(this);
    return User.prepare(this);
  }
}
