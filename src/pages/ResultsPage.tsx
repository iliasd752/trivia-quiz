import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateScore, getScoreColor } from "../utils/quizUtils";
import { QuizQuestion as QuizQuestionType } from "../types/quiz";
import QuizQuestion from "../components/QuizQuestion";

interface LocationState {
  questions: QuizQuestionType[];
  userAnswers: Record<number, number>;
}

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState<number>(0);
  const [scoreClass, setScoreClass] = useState<string>("");

  const state = location.state as LocationState;

  useEffect(() => {
    if (!state || !state.questions) {
      navigate("/");
      return;
    }

    const calculatedScore = calculateScore(state.questions, state.userAnswers);
    setScore(calculatedScore);
    setScoreClass(getScoreColor(calculatedScore));
  }, [state, navigate]);

  if (!state || !state.questions) {
    return null;
  }

  const { questions, userAnswers } = state;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Results</h1>

      {questions.map((question) => (
        <QuizQuestion
          key={question.id}
          question={question}
          userAnswer={userAnswers[question.id] || null}
        />
      ))}
      <div className="mt-8 text-center">
        <div
          className={`p-6 mb-8 rounded-lg shadow-sm border text-center ${scoreClass}`}
        >
          <h2 className="text-3xl font-bold mb-2">
            Your Score: {score} out of {questions.length}
          </h2>
        </div>
        <button
          className="w-2/5 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md"
          onClick={() => navigate("/")}
        >
          Create New Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
