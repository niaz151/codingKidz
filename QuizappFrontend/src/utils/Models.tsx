export type Unit = {
  id: number;
  name: string;
  number: number;
  topics?: Topic[];
};

export type Topic = {
  id: number;
  unitId: number;
  name: string;
  number: number;
  multipleChoiceQuestions?: MultipleChoiceQuestion[];
  trueFalseQuestions?: TrueFalseQuestion[];
};

export type Question = {
  data?:any;
}

export type MultipleChoiceQuestion = Question & {
  id: number;
  topicId: number;
  question: string;
  questionImage?: Buffer;
  correctAnswer: String;
  correctAnswerImage?: Buffer;
  wrongAnswer0: String;
  wrongAnswer0Image?: Buffer;
  wrongAnswer1: String;
  wrongAnswer1Image?: Buffer;
  wrongAnswer2: String;
  wrongAnswer2Image?: Buffer;
};

export type TrueFalseQuestion = Question & {
  id: number;
  topicId: number;
  question: string;
  questionImage?: Buffer;
  correctAnswer: boolean;
};
