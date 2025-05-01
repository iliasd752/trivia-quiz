import { QuizQuestion as QuizQuestionType } from "../types/quiz";

interface QuizQuestionProps {
  question: QuizQuestionType;
  userAnswer: number | null;
  onAnswerSelected: (questionId: number, answerId: number) => void;
  showResult?: boolean;
}

const QuizQuestion = ({
  question,
  userAnswer,
  onAnswerSelected,
  showResult = false,
}: QuizQuestionProps) => {
  return (
    <div className="mb-8 p-4 border rounded-lg">
      <h3 className="text-xl font-medium mb-4">{question.question}</h3>
      <div className="grid gap-3">
        {question.answers.map((answer) => {
          let buttonClass =
            "justify-start text-left py-2 px-4 rounded-md w-full transition-colors";

          if (showResult) {
            if (answer.isCorrect) {
              buttonClass += " bg-green-600 hover:bg-green-600 text-white";
            } else if (userAnswer === answer.id && !answer.isCorrect) {
              buttonClass += " bg-red-600 hover:bg-red-600 text-white";
            } else {
              buttonClass +=
                " border border-gray-300 bg-white text-gray-800 hover:bg-gray-50";
            }
          } else {
            if (userAnswer === answer.id) {
              buttonClass += " bg-blue-600 text-white";
            } else {
              buttonClass +=
                " border border-gray-300 bg-white text-gray-800 hover:bg-gray-50";
            }
          }

          return (
            <button
              key={answer.id}
              className={buttonClass}
              onClick={() =>
                !showResult && onAnswerSelected(question.id, answer.id)
              }
              disabled={showResult}
            >
              {answer.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
