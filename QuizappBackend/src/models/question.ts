import mongoose, { Mongoose } from "mongoose";

interface IQuestion extends mongoose.Document {
  question: string;
}

const Question: mongoose.Model<IQuestion> = mongoose.model(
  "Question",
  new mongoose.Schema({
    question: { type: String, required: true }
  }, {discriminatorKey: "kind" })
);

interface IMultipleChoice extends IQuestion {
  correct_answer: string;
  wrong_answers: {
    wrong_answer_0: string;
    wrong_answer_1: string;
    wrong_answer_2: string;
  };
}

const MultipleChoice = Question.discriminator<IMultipleChoice>(
  "MultipleChoice",
  new mongoose.Schema({
    correct_answer: { type: String, required: true },
    wrong_answers: {
      wrong_answer_0: String,
      wrong_answer_1: String,
      wrong_answer_2: String,
    },
  })
);

export { Question, IMultipleChoice };
