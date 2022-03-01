export default class BaseModel {
  protected static prepare(data: any) {
    data.id = data["_id"];
    delete data["_id"];
    return data;
  }
}
