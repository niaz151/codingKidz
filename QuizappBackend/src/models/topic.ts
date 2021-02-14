import mongoose from "mongoose";
import { IQuestionDoc } from "./question";

export interface ITopic {
  name: string;
  number: number;
  questions?: mongoose.Types.ObjectId[] | IQuestionDoc[];
}

// Define statics here eg Topic.findByName("Loops I")
export interface ITopicDoc extends ITopic, mongoose.Document {}

// Define methods here eg topicOne.addQuestion(questionId)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITopicModel extends mongoose.Model<ITopicDoc> {}

export const Topic: mongoose.Model<ITopicDoc & ITopicModel> = mongoose.model(
  "Topic",
  new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  })
);
