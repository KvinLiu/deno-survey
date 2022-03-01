import { surveyCollection } from "./../mongo.ts";
import BaseModel from "./BaseModel.ts";
export default class Survey extends BaseModel {
  public id?: string = "";
  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {
    super();
  }
  static async findByUser(userId: string): Promise<Survey[]> {
    const surveys = await surveyCollection.find({ userId });
    return surveys.map((data: any) => this.prepare(data));
  }

  async create() {
    delete this.id;
    let id = await surveyCollection.insertOne(this);
    this.id = id.toString();
    return this;
  }

  protected static prepare(data: any): Survey {
    data = BaseModel.prepare(data);
    const survey = new Survey(data.userId, data.name, data.description);
    survey.id = data.id;
    return survey;
  }
}
