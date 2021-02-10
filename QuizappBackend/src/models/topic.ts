import mongoose from "mongoose";

export interface ITopic extends mongoose.Document {
  name: string;
  number: number;
  questions: mongoose.Schema.Types.ObjectId[];
}

export const Topic: mongoose.Model<ITopic> = mongoose.model(
  "Topic",
  new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  })
);
