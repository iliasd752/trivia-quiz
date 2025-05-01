import { Question, QuizQuestion } from "../types/quiz";

export const decodeHTML = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateUniqueId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

export const transformQuestions = (questions: Question[]): QuizQuestion[] => {
  return questions.map((question) => {
    const questionId = generateUniqueId();

    const correctAnswer = {
      id: generateUniqueId(),
      text: decodeHTML(question.correct_answer),
      isCorrect: true,
    };

    const incorrectAnswers = question.incorrect_answers.map((answer) => ({
      id: generateUniqueId(),
      text: decodeHTML(answer),
      isCorrect: false,
    }));

    const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);

    return {
      id: questionId,
      category: question.category,
      type: question.type,
      difficulty: question.difficulty,
      question: decodeHTML(question.question),
      answers: allAnswers,
    };
  });
};

export const calculateScore = (
  questions: QuizQuestion[],
  userAnswers: Record<number, number>
): number => {
  let score = 0;

  questions.forEach((question) => {
    const userAnswerId = userAnswers[question.id];

    const selectedAnswer = question.answers.find(
      (answer) => answer.id === userAnswerId
    );

    if (selectedAnswer && selectedAnswer.isCorrect) {
      score += 1;
    }
  });
  return score;
};

export const getScoreColor = (score: number, length: number): string => {
  if (score <= 1) return "bg-red-500 text-white";

  if (score <= 3) return "bg-yellow-500 text-white";

  return "bg-green-500 text-white";
};
