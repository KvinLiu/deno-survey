import { surveyCollection } from "./../mongo.ts";
export default class Survey {
  public id?: string = "";
  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {}
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

  private static prepare(data: any): Survey {
    const survey = new Survey(data.userId, data.name, data.description);
    survey.id = data["_id"];
    return survey;
  }
}
