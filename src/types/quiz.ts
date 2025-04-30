export interface Category {
  id: number;
  name: string;
}

export interface CategoryResponse {
  trivia_categories: Category[];
}

export interface QuizParams {
  amount: number;
  category: number;
  difficulty: "easy" | "medium" | "hard";
  type: "multiple";
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizResponse {
  response_code: number;
  results: Question[];
}

export interface QuizQuestion
  extends Omit<Question, "correct_answer" | "incorrect_answers"> {
  id: number;
  answers: Array<{
    id: number;
    text: string;
    isCorrect: boolean;
  }>;
}

export interface QuizState {
  questions: QuizQuestion[];
  userAnswers: Record<number, number>;
  score: number;
}
