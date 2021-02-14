import mongoose from "mongoose";

interface IQuestion {
  question: string;
}

// Define statics here eg Question.findByQuestion("Where is the If block?")
export interface IQuestionDoc extends IQuestion, mongoose.Document {}

// Define methods here eg questionOne.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IQuestionModel extends mongoose.Model<IQuestionDoc> {}

const Question: mongoose.Model<IQuestionDoc & IQuestionModel> = mongoose.model(
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

const MultipleChoice = Question.discriminator<IMultipleChoice & mongoose.Document>(
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
