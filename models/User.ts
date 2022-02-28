import { usersCollection } from "./../mongo.ts";

export default class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  constructor({ id = "", name = "", email = "", password = "" }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static async findOne(params: object) {
    let user = await usersCollection.findOne(params);
    if (user) {
      user.id = user["_id"].toString();
      delete user["_id"];
      return new User(user);
    }
    return user;
  }
  async save() {
    delete this.id;
    let id = await usersCollection.insertOne(this);
    //console.log("what is ID", id.toString());
    this.id = id.toString();
    return this;
  }
}
