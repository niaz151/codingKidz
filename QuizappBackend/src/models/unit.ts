import mongoose from "mongoose";
import { ITopicDoc } from "./topic";

export interface IUnit {
  name: string;
  number: number;
  topics?: mongoose.Types.ObjectId[] | ITopicDoc[];
}

// Define statics here eg Unit.findByName("Loops")
export interface IUnitDoc extends IUnit, mongoose.Document {}

// Define methods here eg unitOne.addTopic(topicId);
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IUnitModel extends mongoose.Model<IUnitDoc> {

}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
});

export const Unit: mongoose.Model<IUnitDoc & IUnitModel> = mongoose.model(
  "Unit",
  userSchema
);
