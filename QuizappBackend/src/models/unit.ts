import mongoose from "mongoose";

export interface IUnit extends mongoose.Document {
  name: string;
  number: number;
}

const UnitSchema = new mongoose.Schema({
  name: { type: String, required: true},
  number: { type: Number, required: true },
});

export const Unit: mongoose.Model<IUnit> = mongoose.model("Unit", UnitSchema);
