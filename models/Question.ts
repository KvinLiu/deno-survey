import { Bson } from "../deps.ts";
import { questionCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class Question extends BaseModel {
  constructor(
    public surveyId: string,
    public text: string,
    public type: QuestionType,
    public required: boolean,
    public data: any,
  ) {
    super();
  }
  public id: string = "";

  static async findBySurvey(surveyId: string): Promise<Question[]> {
    const questions = await questionCollection.find({ surveyId });
    return questions.map((question: any) => Question.prepare(question));
  }

  static async findById(id: string): Promise<Question | null> {
    let _id;
    try {
      _id = new Bson.ObjectId(id);
    } catch (_) {
      console.log("error QuestionController: findById");
      return null;
    }
    const question = await questionCollection.findOne({ _id });
    if (!question) {
      return null;
    }
    return Question.prepare(question);
  }

  async create() {
    delete this.id;
    await questionCollection.insertOne(this);
    return Question.prepare(this);
  }

  static async update(
    text: string,
    type: QuestionType,
    required: boolean,
    data: any,
  ) {
    let _id;
    try {
      _id = new Bson.ObjectId(this.id);
    } catch (_) {
      console.log("error SurveyController: update ");
      return null;
    }
    await questionCollection.updateOne(
      { _id },
      { $set: { text, type, required, data } },
      { upsert: true },
    );
    return Question.findById(this.id);
  }

  static delete(id: any) {
    return questionCollection.deleteOne({ _id: id });
  }

  protected static prepare(data: any): Question {
    data = BaseModel.prepare(data);
    const question = new Question(
      data.surveyId,
      data.text,
      data.type,
      data.required,
      data.data,
    );
    question.id = data.id;
    return question;
  }
}

export enum QuestionType {
  CHOICE = "choice",
  TEXT = "text",
}
