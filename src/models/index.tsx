export interface Question {
  id: string;
  question: string;
  correct_answer: string;
  wrong_answers: string[];
}

export interface Unit {
  id: string;
  topic: string;
  unit_number: number;
}
