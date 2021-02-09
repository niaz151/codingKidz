import mongoose from "mongoose";

export interface ITopic extends mongoose.Document {
  name: string;
  number: number;
}

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true},
  number: { type: Number, required: true },
});

export const Topic: mongoose.Model<ITopic> = mongoose.model("Topic", TopicSchema);
