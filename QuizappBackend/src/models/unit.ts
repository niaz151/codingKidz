import mongoose from "mongoose";

export interface IUnit extends mongoose.Document {
  name: string;
  number: number;
  topics: mongoose.Schema.Types.ObjectId[];
}

export const Unit: mongoose.Model<IUnit> = mongoose.model(
  "Unit",
  new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
  })
);
