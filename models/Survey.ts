import { Bson } from "../deps.ts";
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

  static async findById(id: string): Promise<Survey | null> {
    let _id;
    try {
      _id = new Bson.ObjectId(id);
    } catch (_) {
      console.log("error SurveyController: findById");
      return null;
    }
    const survey = await surveyCollection.findOne({ _id });
    if (!survey) {
      return null;
    }
    return this.prepare(survey);
  }

  async create() {
    delete this.id;
    await surveyCollection.insertOne(this);
    return Survey.prepare(this);
  }

  static async update(
    { id, name, description }: {
      id: string;
      name: string;
      description: string;
    },
  ) {
    let _id;
    try {
      _id = new Bson.ObjectId(id);
    } catch (_) {
      console.log("error SurveyController: update ");
      return null;
    }
    await surveyCollection.updateOne(
      { _id },
      { $set: { name, description } },
      { upsert: true },
    );
    return Survey.findById(id);
  }

  static delete(id: any) {
    return surveyCollection.deleteOne({ _id: id });
  }
}
