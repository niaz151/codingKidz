export interface NewQuestion {
  question: string;
  correct_answer: string;
  wrong_answers: string[];
}

export interface Question extends NewQuestion {
  id: string;
}

export interface NewTopic {
  topic: string;
  quiz_number: number;
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
