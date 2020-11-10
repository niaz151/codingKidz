export interface NewTrueFalse {
  question: string;
  correct_answer: string;
  wrong_answers: string[];
}

export interface TrueFalse extends NewTrueFalse {
  id: string;
}

export interface NewMultipleChoice {
  question: string;
  correct_answer: string;
  wrong_answers: string[];
}

export interface MultipleChoice extends NewMultipleChoice {
  id: string;
}

export interface NewTopic {
  name: string;
  topic_number: number;
}

export interface Topic extends NewTopic {
  id: string;
}

export interface NewUnit {
  unit_number: number;
  name: string;
}

export interface Unit extends NewUnit {
  id: string;
}

export type Role = 
  | "teacher"
  | "admin"
  | "student"
