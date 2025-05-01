import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion";
import { transformQuestions } from "../utils/quizUtils";
import { fetchQuiz } from "../api/quizApi";
import { QuizQuestion as QuizQuestionType } from "../types/quiz";

const QuizPage = () => {
  const { categoryId, difficulty } = useParams<{
    categoryId: string;
    difficulty: string;
  }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["quiz", categoryId, difficulty],
    queryFn: () =>
      fetchQuiz({
        amount: 5,
        category: Number(categoryId) || 0,
        difficulty: (difficulty as "easy" | "medium" | "hard") || "easy",
        type: "multiple",
      }),
    enabled: !!categoryId && !!difficulty,
  });

  useEffect(() => {
    if (data) {
      const transformedQuestions = transformQuestions(data.results);
      setQuestions(transformedQuestions);
    }
  }, [data]);

  const handleAnswerSelected = (questionId: number, answerId: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {
    navigate("/results", {
      state: {
        questions,
        userAnswers,
      },
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading quiz questions...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p>Error loading quiz. Please try again.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const allQuestionsAnswered =
    questions.length > 0 &&
    questions.every((question) => userAnswers[question.id] !== undefined);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Challenge</h1>

      {questions.map((question) => (
        <QuizQuestion
          key={question.id}
          question={question}
          userAnswer={userAnswers[question.id] || null}
          onAnswerSelected={handleAnswerSelected}
        />
      ))}

      {allQuestionsAnswered && (
        <div className="mt-8 text-center">
          <button
            className="w-2/5 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
