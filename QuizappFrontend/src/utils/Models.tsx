export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export enum QuizResultStatus {
  LOCKED = 'LOCKED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export type User = {
  id: number;
  email: string;
  password: string;
  roles: Role[];
  profile?: Profile;
  quizResults?: QuizResult[]
};

export type Profile = {
  avatar: Buffer;
  userId: User['id'];
};

export type QuizResult = {
  id: number,
  user?: User
  userId: number,
  topic: Topic,
  topicId: number, 
  status: QuizResultStatus
}

export type Language = {
  id: number;
  name: string;
  units?: Unit[];
};

export type Unit = {
  id: number;
  languageId: Language['id'];
  name: string;
  number: number;
  topics?: Topic[];
};

export type Topic = {
  id: number;
  unitId: Unit['id'];
  name: string;
  number: number;
  multipleChoiceQuestions?: MultipleChoiceQuestion[];
  trueFalseQuestions?: TrueFalseQuestion[];
  quizResults?: QuizResult[]
};

type Question = {
  id: number;
  topicId: Topic['id'];
  question: string;
  questionImage?: number;
};

export interface MultipleChoiceQuestion extends Question {
  questionImage?: number;
  correctAnswer: string;
  correctAnswerImage?: number;
  wrongAnswer0: string;
  wrongAnswer0Image?: number;
  wrongAnswer1: string;
  wrongAnswer1Image?: number;
  wrongAnswer2: string;
  wrongAnswer2Image?: number;
}

export interface TrueFalseQuestion extends Question {
  correctAnswer: boolean;
}
