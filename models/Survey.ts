import { surveyCollection } from "./../mongo.ts";
export default class Survey {
  public id?: string = "";
  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {}
  static async findByUser(userId: string) {
    console.log(userId);
    return surveyCollection.find({ userId });
  }
  async create() {
    delete this.id;
    let id = await surveyCollection.insertOne(this);
    this.id = id.toString();
    return this;
  }
}
