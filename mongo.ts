import { MongoClient } from "./deps.ts";
const client = new MongoClient();

// await client.connect(
//   "mongodb+srv://deno_survey:4T1wcHXJSwqAsDOI@cluster0.amegx.mongodb.net/denoSurvey?retryWrites=true&w=majority",
// );
// interface UserSchema {
//   username: string;
//   password: string;
// }
await client.connect("mongodb://localhost:27017");
const db = client.database("deno");
export const usersCollection = db.collection("users");
