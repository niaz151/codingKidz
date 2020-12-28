export interface NewTrueFalse {
  question: string;
  answer: boolean;
}

export interface TrueFalse extends NewTrueFalse {
  id: string;
}

export interface NewMultipleChoice {
  question: string;
  correct_answer: string;
  wrong_answers: {
    wrong_answer_0: string;
    wrong_answer_1: string;
    wrong_answer_2: string;
    wrong_answer_3: string;
  }
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

export type Role = "teacher" | "admin" | "student";

/********************
 **HELPER FUNCTIONS**
 ********************/
export const isMultipleChoice = (
  question: MultipleChoice | TrueFalse
): question is MultipleChoice => {
  return (question as MultipleChoice).correct_answer !== undefined;
};

export const isTrueFalse = (
  question: MultipleChoice | TrueFalse
): question is TrueFalse => {
  return (question as TrueFalse).answer !== undefined;
};
